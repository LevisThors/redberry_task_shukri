import React, { useRef, useState, useEffect } from "react";
import "./Dropzone.scss";

interface DropzoneProps {
    onFileUpload: (file: File | null) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("formData") || "{}");

        if (storedData.image) {
            setImage(storedData.image);
            setFileName(storedData.imageName);
        } else {
            setError("ფაილი არ არის არჩეული. გთხოვთ ატვირთეთ ფოტო.");
        }
    }, []);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleFile(file);
        } else {
            setError("არასწორი ფაილის ფორმატი. გთხოვთ ატვირთეთ ფოტო.");
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            handleFile(file);
            setError(null);
        } else {
            setError("ფაილი არ არის არჩეული. გთხოვთ ატვირთეთ ფოტო.");
        }
    };
    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
            setFileName(file.name);
            onFileUpload(file);
            setError(null);
        };
        reader.readAsDataURL(file);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();

            setTimeout(() => {
                if (!fileInputRef.current?.files?.length) {
                    setError("ფაილი არ არის არჩეული. გთხოვთ ატვირთეთ ფოტო.");
                }
            }, 500);
        }
    };

    const handleDelete = () => {
        setImage(null);
        setFileName(null);
        onFileUpload(null);
    };

    return (
        <div className="image-dropzone-container">
            <label className="image-dropzone-label">ატვირთეთ ფოტო</label>
            {image ? (
                <div className="image-dropzone-uploaded">
                    <div className="image-dropzone-uploaded-inner">
                        <img
                            src="/assets/icon_image.svg"
                            alt="Uploaded image"
                            width={24}
                            height={24}
                        />
                        <span>{fileName}</span>
                    </div>
                    <img
                        src="/assets/icon_plus.svg"
                        alt="Delete image"
                        width={24}
                        height={24}
                        className="image-dropzone-remove"
                        onClick={handleDelete}
                    />
                </div>
            ) : (
                <div
                    onClick={handleClick}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDrop}
                    className={`image-dropzone ${
                        error && "image-dropzone-fail"
                    }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                    />

                    <img
                        src="/assets/icon_media.svg"
                        alt="Upload image"
                        width={40}
                        height={40}
                    />
                    <span>
                        ჩააგდეთ ფაილი აქ ან
                        <button className="image-dropzone-upload">
                            აირჩიეთ ფაილი
                        </button>
                    </span>
                </div>
            )}
            {error && (
                <span className="input-validation input-validation-fail">
                    {error}
                </span>
            )}
        </div>
    );
};

export default Dropzone;
