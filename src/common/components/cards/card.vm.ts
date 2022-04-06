export interface CardVm {
    imgSrc: string;
    defaultImg: string;
    mainLabel: string;
    secondaryLabel: string;
    secondaryLabelHelperText?: string;
    detailLabel: string;
    detailLabelHelperText: string;
}

export const createDefaultCardVm = (): CardVm => ({
    imgSrc: "",
    detailLabel: "",
    defaultImg: "",
    secondaryLabel: "",
    mainLabel: "",
    detailLabelHelperText: "",
})
