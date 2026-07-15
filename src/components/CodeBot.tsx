"use client";

import { ChangeEvent, useState } from "react";
import { GitBranch, Globe, SquareTerminal } from "lucide-react";
import { H6 } from "./ui/Typography";
import { IRepository } from "@/types/types";
import { checkIfRepoParsedAPI, fetchBranchesAPI, parseRepoAPI } from "@/actions/github.actions";
import { CodeBotHeader } from "./CodeBotHeader";
import { RepoSelection } from "./RepoSelection";

export function Codebot({repositories, installationId, token}: {repositories: IRepository[]; installationId: string; token: string}) {
    const [selectedRepo, setSelectedRepo] = useState<{
        name: string;
        full_name: string;
        owner: string;
    } | null >(null);
    const [branches, setBranches] = useState<string[]>([]);
    const [selectedBranch, setSelectedBranch] = useState("");
    const [branchesLoading, setBranchesLoading] = useState(false);
    const [parsingInProgress, setParsingInProgress] = useState(false);
    const [query, setQuery] = useState("");


    async function handleRepoChange(repo: string){
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

    function handleQueryChange(e: ChangeEvent<HTMLTextAreaElement>){
        const value = e.target.value;
        console.log("Query changed: ", value);
        setQuery(value);
        
    }

    return (
        <div className="flex flex-col items-center mt-20">
            <CodeBotHeader />
            <div className="flex w-[80%] bg-bg_secondary p-5 rounded-2xl mt-5 gap-6">
               <RepoSelection branches={branches} branchesLoading={branchesLoading} handleBranchChange={handleBranchChange} handleRepoChange={handleRepoChange} repositories={repositories} selectedBranch={selectedBranch} selectedRepo={selectedRepo} />
            </div>
            {/* chat box will be here, we will disable when parsingInProgress is true and enable when branch and repo is selected and parsingInProgress is false. */}
            <div className={`flex flex-col items-center mt-10 gap-3 w-[80%] ${parsingInProgress ? "pointer-events-none" : ""}`}>
                <textarea
                    className={`p-3 w-full rounded-md border border-gray-100 bg-bg_primary text-text text-sm resize-none ${
                        parsingInProgress || !selectedRepo || !selectedBranch
                            ? "cursor-not-allowed"
                            : "cursor-text"
                    }`}
                    name="query"
                    rows={5}
                    placeholder="Type your query here..."
                    onChange={(e) => handleQueryChange(e)}
                    disabled={parsingInProgress || !selectedRepo || !selectedBranch}
                />

                <div className="flex items-center justify-between w-full">
                    <select
                        disabled={parsingInProgress || !selectedRepo || !selectedBranch}
                        className={`px-3 py-2 rounded-md bg-bg_primary border border-gray-200 text-white text-sm outline-none ${
                            parsingInProgress || !selectedRepo || !selectedBranch
                                ? "cursor-not-allowed opacity-50"
                                : "cursor-pointer"
                        }`}
                    >
                        <option>Feature Implementation</option>
                        <option>Explain Code</option>
                        <option>Find Bug</option>
                    </select>

                    <button
                        className={`px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition ${
                            parsingInProgress || !selectedRepo || !selectedBranch
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