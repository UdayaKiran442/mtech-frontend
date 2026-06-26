"use client";

import { useState } from "react";
import { GitBranch, Globe, SquareTerminal } from "lucide-react";
import { H6 } from "./ui/Typography";
import { IRepository } from "@/types/types";
import { checkIfRepoParsedAPI, fetchBranchesAPI, parseRepoAPI } from "@/actions/github.actions";

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

    return (
        <div className="flex flex-col items-center mt-20">
            <div className="flex flex-col items-center mt-10 gap-4 ">
                <SquareTerminal className="text-icon_primary" size={48} />
                <H6 className="text-white">Cook with Codebot</H6>
                <p className="text-text text-sm">Query your codebase by selecting repository and branch</p>
            </div>
            <div className="flex w-[80%] bg-bg_secondary p-5 rounded-2xl mt-5 gap-6">
                {/* repo */}
                <div className="flex flex-col gap-2 w-1/2">
                    {/* repo with icon */}
                    <div className="flex items-center gap-1">
                        <Globe size={14} className="text-icon_primary" />
                        <p className="text-text text-sm">Repo</p>
                    </div>
                    {/* dropdown with repo names */}
                    <select
                        className="p-2 cursor-pointer rounded-md border border-bg_primary bg-bg_primary text-text text-sm"
                        value={selectedRepo?.name || ""}
                        onChange={(e) => handleRepoChange(e.target.value)}
                    >
                        <option value="">Select a repository</option>
                        {repositories.map((repo) => (
                            <option key={repo.id} value={repo.name}>
                                {repo.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* branch */}
                <div className="flex flex-col gap-2 w-1/2">
                    {/* branch with icon */}
                    <div className="flex items-center gap-1">
                        <GitBranch size={14} className="text-icon_primary" />
                        <p className="text-text text-sm">Branch</p>
                    </div>
                    {/* dropdown with branch names */}
                    <select
                        className={`p-2 rounded-md border border-bg_primary bg-bg_primary text-text text-sm ${selectedRepo || branchesLoading ? "cursor-pointer": "cursor-not-allowed"}`}
                        value={selectedBranch}
                        disabled={!selectedRepo || branchesLoading}
                        onChange={(e) => handleBranchChange(e.target.value)}
                    >
                        <option value="">{selectedRepo ? "Select a branch" : "Select a repo first"}</option>
                        {branches.map((branch) => (
                            <option key={branch} value={branch}>
                                {branch}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* chat box will be here, we will disable when parsingInProgress is true and enable when branch and repo is selected and parsingInProgress is false. */}
            <div className={`flex flex-col items-center mt-10 gap-4 w-[80%] ${parsingInProgress ? "pointer-events-none": ""}`}>
                <textarea 
                    className={`p-2 w-full rounded-md border border-gray-100 bg-bg_primary text-text text-sm ${parsingInProgress || !selectedRepo || !selectedBranch ? "cursor-not-allowed" : "cursor-text"}`} 
                    name="query" 
                    rows={5}
                    placeholder="Type your query here..." 
                    disabled={parsingInProgress || !selectedRepo || !selectedBranch} 
                />
                <div className="flex justify-between w-full">
                    <div>
                        <select disabled={parsingInProgress || !selectedRepo || !selectedBranch}  className="text-white p-1 left-2 rounded-md bg-bg_primary border border-gray-200 text-sm">
                            <option>Feature Implementation</option>
                            <option>Explain Code</option>
                            <option>Find Bug</option>
                        </select>
                    </div>
                    <div>
                        <button className={` px-2 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${parsingInProgress || !selectedRepo || !selectedBranch ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={parsingInProgress || !selectedRepo || !selectedBranch} >
                            Send
                        </button>
                    </div>                 
                </div>

            </div>
        </div>
    );
}