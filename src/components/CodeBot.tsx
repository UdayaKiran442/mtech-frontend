"use client";

import { useState } from "react";
import { GitBranch, Globe, SquareTerminal } from "lucide-react";
import { H6 } from "./ui/Typography";

export function Codebot() {
    const [selectedRepo, setSelectedRepo] = useState("");
    const [branches, setBranches] = useState<string[]>([]);
    const [selectedBranch, setSelectedBranch] = useState("");

    const repos = ["Repo 1", "Repo 2", "Repo 3"]; // Example repo names

    const handleRepoChange = (repo: string) => {
        setSelectedRepo(repo);
        // Example branches for the selected repo
        setBranches(repo ? ["Branch 1", "Branch 2", "Branch 3"] : []);
    };

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
                        value={selectedRepo}
                        onChange={(e) => handleRepoChange(e.target.value)}
                    >
                        <option value="">Select a repository</option>
                        {repos.map((repo) => (
                            <option key={repo} value={repo}>
                                {repo}
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
                        className={`p-2 rounded-md border border-bg_primary bg-bg_primary text-text text-sm ${selectedRepo ? "cursor-pointer": "cursor-not-allowed"}`}
                        value={selectedBranch}
                        disabled={!selectedRepo}
                        onChange={(e) => setSelectedBranch(e.target.value)}
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
        </div>
    );
}