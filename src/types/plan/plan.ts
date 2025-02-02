export type Plan = {
    id: number
    caseNumber: string
    client: { id: number; name: string }
    jobStartDate: string
    AppendixLink: string
    status: 'Completed' | 'Failed' | 'In progress'
}
