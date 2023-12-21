export interface ValidatorType {
    author: {
        "მინიმუმ 4 სიმბოლო": boolean;
        "მინიმუმ ორი სიტყვა": boolean;
        "მხოლოდ ქართული სიმბოლოები": boolean;
    };
    title: {
        "მინიმუმ 2 სიმბოლო": boolean;
    };
    description: {
        "მინიმუმ 2 სიმბოლო": boolean;
    };
    email: {
        "მეილი უნდა მთავრდებოდეს @redberry.ge-ით": boolean;
    };
}
