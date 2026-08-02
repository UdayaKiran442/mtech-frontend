"use client";

import { ChangeEvent, useState } from "react";
import { GitBranch, Globe, SquareTerminal } from "lucide-react";
import { H6 } from "./ui/Typography";
import { IRepository, ISearchFilesResponseAPI } from "@/types/types";
import { checkIfRepoParsedAPI, fetchBranchesAPI, parseRepoAPI } from "@/actions/github.actions";
import { CodeBotHeader } from "./CodeBotHeader";
import { RepoSelection } from "./RepoSelection";
import { searchFilesAPI } from "@/actions/search.actions";

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
        // check if the word is starting with "@", if so go to if loop
        const words = value.split(" ");
        const lastWord = words[words.length - 1];
        const startingWord = lastWord[0];

        if (startingWord === "@" && selectedRepo) {
            const searchString = lastWord.slice(1);
            // call search files API and show a dropdown of files in the repo and branch selected. Once a file is selected, insert the file path in the query text area.
            // when search string other than "@" has value greater than 2, call search files API and show a drop down
            if (searchString.length > 2) {
                // call search files API
                const files = await searchFilesAPI({
                    branch: selectedBranch,
                    repoName: selectedRepo.name,
                    searchString: searchString,
                    workspaceId: workspaceId
                }, token);
                setSearchResults(files.files);
                // set query except the last word
                setQuery(words.slice(0, words.length - 1).join(" ") + " ");
            }
            else {
                setSearchResults({
                    knowledgeBaseFiles: [],
                    repoFiles: []
                });
                setQuery(value);
            }
        }

        // always update the textarea value so user can type/delete normally
        setQuery(value);

    }

    function insertSearchFileInQuery(fileName: string) {
        setQuery((prev) => {
            const atIndex = prev.lastIndexOf("@");
            const before = atIndex !== -1 ? prev.slice(0, atIndex) : prev;
            const newQuery = (before + fileName).trimEnd() + " ";
            return newQuery;
        });
        setSearchResults({ knowledgeBaseFiles: [], repoFiles: [] });
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
                            <button key={f.filePath} onClick={() => insertSearchFileInQuery(f.filePath)} className="w-full text-left px-3 py-2 hover:bg-gray-100">
                                <div className="text-sm text-gray-800">{f.filePath}</div>
                                <div className="text-xs text-gray-500">{f.repoName} — {f.branch}</div>
                            </button>
                        ))}
                        {searchResults.knowledgeBaseFiles.map((k) => (
                            <button key={k.fileId} onClick={() => insertSearchFileInQuery(k.key)} className="w-full text-left px-3 py-2 hover:bg-gray-100">
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
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}