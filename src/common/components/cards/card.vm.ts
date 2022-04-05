export interface CardVm {
    imgSrc: string;
    defaultImg: string;
    mainLabel: string;
    secondaryLabel: string;
    detailLabel: string;
}

export const createDefaultCardVm = (): CardVm => ({
    imgSrc: "",
    detailLabel: "",
    defaultImg: "",
    secondaryLabel: "",
    mainLabel: ""
})
