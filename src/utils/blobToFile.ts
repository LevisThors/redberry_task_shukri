export const blobToFile = (base64: string, name: string) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const type = base64.split(";")[0].split(":")[1];
    const file = new File([byteArray], `${name}.${type}`, {
        type: type,
    });

    return file;
};
