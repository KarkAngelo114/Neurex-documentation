
export const NavigateTo = (link) => {

    if (!link || link === "" || link === null || link === undefined) {
        return;
    }

    window.open(link, "_blank", "noopener,noreferrer");
}

export const ReplacePage = (link) => {

    if (!link || link === "" || link === null || link === undefined) {
        return;
    }

    window.location.replace(link);
}