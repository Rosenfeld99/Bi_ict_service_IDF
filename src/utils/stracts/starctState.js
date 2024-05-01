import { generateID } from "../func";

export const stateStrcatObject = {
    initState: {
        battalionName: "",
        battalion_id: generateID(),
        means: [
            {
                meansName: "",
                meansType: {
                    nameType: "",
                    type_id: generateID(),
                    amount: "",
                    properICT: "",
                    properAmm: "",
                    portent: "",
                    comments: "",
                },
                totalTypePercent: "",
                comments: "",
                mean_id: generateID()
            },
            {
                meansName: "",
                meansType: {
                    nameType: "",
                    type_id: generateID(),
                    amount: "",
                    properICT: "",
                    properAmm: "",
                    portent: "",
                    comments: "",
                },
                totalTypePercent: "",
                comments: "",
                mean_id: generateID()
            }
        ],
        percentOfUnit: "",
        totalSumBattalion: "",
        comments: "",
    },
    newBrigade: {
        brigadeName: "",
        brigade_id: generateID(),
        battalion: [],
        lastUpdateTime: "14-04-2024",
        lastUpdater: "new battaleion",
        totalSumQualification: "40",
        totalViewQualification: [
            {
                meansName: "a",
                meansType: "24",
            },

        ],
        workSpace: "alpha",
        comments: "no comments",
    },
    newLineMans: {
        meansName: "",
        meansType: {
            nameType: "",
            type_id: generateID(),
            amount: "",
            properICT: "",
            properAmm: "",
            portent: "",
            comments: "",
        },
        totalTypePercent: "",
        comments: "",
        mean_id: generateID()
    },

};












