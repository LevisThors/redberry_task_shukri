import { BlogFormType } from "../types/BlogFormType";
import { ValidatorType } from "./ValidatorType";

export const useValidator = (data: BlogFormType) => {
    const errors: ValidatorType = {
        author: {
            "მინიმუმ 4 სიმბოლო": data.author.replace(/\s/g, "").length >= 4,
            "მინიმუმ ორი სიტყვა":
                data.author.split(" ").filter((word) => word.length > 0)
                    .length >= 2,
            "მხოლოდ ქართული სიმბოლოები":
                data.author.length > 0
                    ? [...data.author].every((char) =>
                          georgianAlphabet().includes(char)
                      )
                    : false,
        },
        title: {
            "მინიმუმ 4 სიმბოლო": data.title.length >= 4,
        },
        description: {
            "მინიმუმ 4 სიმბოლო": data.description.length >= 4,
        },
        email: {
            "მეილი უნდა მთავრდებოდეს @redberry.ge-ით":
                data.email.includes("@redberry.ge"),
        },
    };

    return errors;
};

const georgianAlphabet = () => {
    return [
        "ა",
        "ბ",
        "გ",
        "დ",
        "ე",
        "ვ",
        "ზ",
        "თ",
        "ი",
        "კ",
        "ლ",
        "მ",
        "ნ",
        "ო",
        "პ",
        "ჟ",
        "რ",
        "ს",
        "ტ",
        "უ",
        "ფ",
        "ქ",
        "ღ",
        "ყ",
        "შ",
        "ჩ",
        "ც",
        "ძ",
        "წ",
        "ჭ",
        "ხ",
        "ჯ",
        "ჰ",
        " ",
    ];
};
