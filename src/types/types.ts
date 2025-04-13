interface Project {
    projectId: string,
    projectName: string,
    projectDescription: string,
    projectCreated: string,
    projectStartDate: string,  
    projectEndDate: string,    
    projectIssues: Array<Issue>,  
}

interface Issue {
    issueId: string,  
    projectId: string,  
    issueName: string,
    issueDescription: string,
    issueCreated: string,
    issueCategory: IssueCategory,
    issueStatus: IssueStatus
}

enum IssueCategory {
    Bug = "Bug",
    Feature = "Feature",
    UI = "UI",
}

enum IssueStatus {
    Open = "Open",
    Closed = "Closed",
}