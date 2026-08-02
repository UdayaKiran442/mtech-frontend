"use client";

import { ChangeEvent, useState } from "react";
import { IRepository, ISearchFilesResponseAPI } from "@/types/types";
import { checkIfRepoParsedAPI, fetchBranchesAPI, parseRepoAPI } from "@/actions/github.actions";
import { CodeBotHeader } from "./CodeBotHeader";
import { RepoSelection } from "./RepoSelection";
import { searchFilesAPI } from "@/actions/search.actions";

type SelectedFile = {
    path: string;
    type: "repo" | "knowledgeBase";
};

export function Codebot({ repositories, installationId, token, workspaceId }: { repositories: IRepository[]; installationId: string; token: string; workspaceId: string }) {
    const [selectedRepo, setSelectedRepo] = useState<{
        name: string;
        full_name: string;
        owner: string;
    } | null>(null);
    const [branches, setBranches] = useState<string[]>([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [branchesLoading, setBranchesLoading] = useState(false);
    const [parsingInProgress, setParsingInProgress] = useState(false);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<ISearchFilesResponseAPI['files']>({
        knowledgeBaseFiles: [],
        repoFiles: []
    });
    // this is to keep track of the files selected from search, this will be sent to backend when user submits the query.
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);


    async function handleRepoChange(repo: string) {
        const selected = repositories.find((r) => r.name === repo);
        if (!selected) {
            return;
        }
        setSelectedRepo({
            name: selected?.name || "",
            full_name: selected?.full_name || "",
            owner: selected?.owner.login || "",
        });
        setBranchesLoading(true);
        // call API to fetch branches for the selected repo and update state
        const branches = await fetchBranchesAPI({
            installationId,
            repo: selected?.name,
            owner: selected?.owner.login
        }, token)
        if (!branches.success) {
            // show error message
            setBranchesLoading(false);
            return;
        }
        const branchNames = branches.branches.map((b) => b.name);
        setBranchesLoading(false);
        setBranches(branchNames);

    };

    async function handleBranchChange(branch: string) {
        setSelectedBranch(branch);
        if (!selectedRepo) {
            return;
        }
        // once repo and branch selection is done, check if the particular branch and repo is parsed and upserted to neo4j. If not show a message "Parsing in progress, please wait..." and disable the chat input until the parsing is done. Once it's done, enable the chat input and show a message "Parsing completed, you can now chat with Codebot!"  
        const response = await checkIfRepoParsedAPI({
            repoName: selectedRepo.name,
            branch
        }, token);
        if (!response.success) {
            // show error message
            return;
        }
        const isParsed = response.isParsed;
        if (!isParsed) {
            // call parsing API
            setParsingInProgress(true);
            const response = await parseRepoAPI({
                installationId,
                repoName: selectedRepo.name,
                branch,
                owner: selectedRepo.owner
            }, token);
            setParsingInProgress(false);
            if (!response.success) {
                // show error message
                return;
            }
        }
    }

    async function handleQueryChange(e: ChangeEvent<HTMLTextAreaElement>) {
        const value = e.target.value;
        setQuery(value);

        if (!selectedRepo || !selectedBranch) {
            setSearchResults({
                repoFiles: [],
                knowledgeBaseFiles: [],
            });
            return;
        }

        const words = value.split(" ");
        const lastWord = words.at(-1) ?? "";

        if (!lastWord.startsWith("@")) {
            setSearchResults({
                repoFiles: [],
                knowledgeBaseFiles: [],
            });
            return;
        }

        const searchString = lastWord.slice(1);

        if (searchString.length < 3) {
            setSearchResults({
                repoFiles: [],
                knowledgeBaseFiles: [],
            });
            return;
        }

        const files = await searchFilesAPI(
            {
                branch: selectedBranch,
                repoName: selectedRepo.name,
                searchString,
                workspaceId,
            },
            token
        );

        if (files.success) {
            setSearchResults(files.files);
        }
    }

    function insertSearchFileInQuery({ fileName, path, type }: { fileName: string; path: string; type: "repo" | "knowledgeBase" }) {
        setQuery((prev) => {
            const atIndex = prev.lastIndexOf("@");

            if (atIndex === -1) return prev;

            return prev.slice(0, atIndex) + fileName + " ";
        });

        setSelectedFiles((prev) => {
            const exists = prev.some(
                (f) => f.path === path && f.type === type
            );

            if (exists) return prev;

            return [
                ...prev,
                {
                    path,
                    type,
                },
            ];
        });

        setSearchResults({
            repoFiles: [],
            knowledgeBaseFiles: [],
        });
    }

    async function handleSubmit() {
        setQuery("");
        setSelectedFiles([]);
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <CodeBotHeader />
            <div className="flex w-[80%] bg-bg_secondary p-5 rounded-2xl mt-5 gap-6">
                <RepoSelection branches={branches} branchesLoading={branchesLoading} handleBranchChange={handleBranchChange} handleRepoChange={handleRepoChange} repositories={repositories} selectedBranch={selectedBranch} selectedRepo={selectedRepo} />
            </div>
            {/* chat box will be here, we will disable when parsingInProgress is true and enable when branch and repo is selected and parsingInProgress is false. */}
            <div className={`relative flex flex-col items-center mt-10 gap-3 w-[80%] ${parsingInProgress ? "pointer-events-none" : ""}`}>
                {/* dropdown for search results */}
                <textarea
                    className={`p-3 w-full rounded-md border border-gray-100 bg-bg_primary text-text text-sm resize-none ${parsingInProgress || !selectedRepo || !selectedBranch
                        ? "cursor-not-allowed"
                        : "cursor-text"
                        }`}
                    name="query"
                    value={query}
                    rows={5}
                    placeholder="Type your query here..."
                    onChange={(e) => handleQueryChange(e)}
                    disabled={parsingInProgress || !selectedRepo || !selectedBranch}
                />

                {(searchResults.repoFiles.length > 0 || searchResults.knowledgeBaseFiles.length > 0) && (
                    <div className="absolute left-0 right-0 mt-10 bg-white rounded-md shadow-lg z-50 max-h-48 overflow-auto w-full cursor-pointer">
                        {searchResults.repoFiles.map((f) => (
                            <button key={f.filePath} onClick={() => insertSearchFileInQuery({ fileName: f.fileName, type: "repo", path: f.filePath })} className="w-full text-left px-3 py-2 hover:bg-gray-100">
                                <div className="text-sm text-gray-800">{f.filePath}</div>
                                <div className="text-xs text-gray-500">{f.repoName} — {f.branch}</div>
                            </button>
                        ))}
                        {searchResults.knowledgeBaseFiles.map((k) => (
                            <button key={k.fileId} onClick={() => insertSearchFileInQuery({ fileName: k.key, type: "knowledgeBase", path: k.key })} className="w-full text-left px-3 py-2 hover:bg-gray-100">
                                <div className="text-sm text-gray-800">{k.key}</div>
                                <div className="text-xs text-gray-500">Knowledge Base</div>
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between w-full">
                    <select
                        disabled={parsingInProgress || !selectedRepo || !selectedBranch}
                        className={`px-3 py-2 rounded-md bg-bg_primary border border-gray-200 text-white text-sm outline-none ${parsingInProgress || !selectedRepo || !selectedBranch
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                            }`}
                    >
                        <option>Feature Implementation</option>
                        <option>Explain Code</option>
                        <option>Find Bug</option>
                    </select>

                    <button
                        className={`px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition ${parsingInProgress || !selectedRepo || !selectedBranch
                            ? "cursor-not-allowed opacity-50"
                            : "cursor-pointer"
                            }`}
                        disabled={parsingInProgress || !selectedRepo || !selectedBranch}
                        onClick={handleSubmit}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}