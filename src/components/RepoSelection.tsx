"use client";

import { IRepository } from "@/types/types";
import { GitBranch, Globe } from "lucide-react";

type IRepoSelectionProps = {
    selectedRepo: {
        name: string;
        full_name: string;
        owner: string;
    } | null;
    handleRepoChange: (repo: string) => void;
    repositories: IRepository[];
    selectedBranch: string;
    branchesLoading: boolean;
    handleBranchChange: (branch: string) => void;
    branches: string[];
}

export function RepoSelection({ selectedRepo, handleRepoChange, repositories, selectedBranch, branchesLoading, handleBranchChange, branches }: IRepoSelectionProps) {
    return (
        <>
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
                    className={`p-2 rounded-md border border-bg_primary bg-bg_primary text-text text-sm ${!selectedRepo || branchesLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
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
        </>
    )
}