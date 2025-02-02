export enum Plan_STATUSES {
    Completed = 'Completed',
    InProgress = 'In progress',
    Failed = 'Failed',
}

const draftedFields = Array.from({ length: 40 }, (_, index) => ({
    id: index + 1,
    caseNumber: `Case ${index + 1}`,
    client: { id: index, name: `Grower ${index + 1}` },
    jobStartDate: new Date(2023, 9, 15).toISOString().split('T')[0],
    AppendixLink: 'Data Data Data',
    status: Object.values(Plan_STATUSES)[
        Math.floor(Math.random() * Object.values(Plan_STATUSES).length)
    ],
}))

export const WIZARD_STEP2_RESPONSE = [
    ...draftedFields.filter((item) => item.status !== Plan_STATUSES.Completed),
    ...draftedFields.filter((item) => item.status === Plan_STATUSES.Completed),
]
