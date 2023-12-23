import React, { useRef, useState } from "react";
import "./Dropzone.scss";

interface DropzoneProps {
    onFileUpload: (file: File | null) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUpload }) => {
    const [image, setImage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
            setFileName(file.name);
            onFileUpload(file);
        };
        reader.readAsDataURL(file);
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleDelete = () => {
        setImage(null);
        setFileName(null);
        onFileUpload(null);
    };

    return (
        <>
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
                    className="image-dropzone"
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
                        ჩააგდეთ ფაილი აქ ან{" "}
                        <button className="image-dropzone-upload">
                            აირჩიეთ ფაილი
                        </button>
                    </span>
                </div>
            )}
        </>
    );
};

export default Dropzone;
