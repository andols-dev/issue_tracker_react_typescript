export interface Project {
    projectId: string,
    projectName: string,
    projectDescription: string,
    projectCreated: string,
    projectStartDate: string,  
    projectEndDate: string,    
    projectIssues: Array<Issue>,  
}

export interface Issue {
    issueId: string,  
    projectId: string,  
    issueName: string,
    issueDescription: string,
    issueCreated: string,
    issueCategory: IssueCategory.Bug | IssueCategory.Feature | IssueCategory.UI,
    issueStatus: IssueStatus.Closed | IssueStatus.Open,    
}

export enum IssueCategory {
    Bug = "Bug",
    Feature = "Feature",
    UI = "UI",
}

export enum IssueStatus {
    Open = "Open",
    Closed = "Closed",
}