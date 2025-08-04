import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '~/lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
    file?: File | null;
}

const FileUploader = ( {onFileSelect, file: propFile}: FileUploaderProps) => {

    const onDrop = useCallback((acceptedFiles : File[]) => {
        const file = acceptedFiles[0] || null;

        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;

    const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections, inputRef} = useDropzone({
        onDrop,
        multiple: false,
        accept: {'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = propFile !== undefined ? propFile : (acceptedFiles[0] || null);

    return (
        <div className="w-full gradient-border !p-3">
            <div {...getRootProps()} className="bg-white/50 rounded-2xl">
                <input {...getInputProps()} />

                <div className="space-y-4 cursor-pointer">

                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-start space-x-3">
                                <img src="/images/pdf.png" alt="PDF" className="size-10" />
                                <div className="relative flex flex-col items-start justify-center gap-1 text-start overflow-hidden">
                                    <p className="relative text-sm text-gray-700 font-medium">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 text-start">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center min-w-fit">
                                <button
                                    className="p-2 cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log('Remove button clicked');
                                        // Clear the input value to reset dropzone
                                        if (inputRef.current) {
                                            inputRef.current.value = '';
                                        }
                                        onFileSelect?.(null);
                                    }}
                                >
                                    <img src="/icons/cross.svg" alt="Remove" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm md:text-lg text-gray-500 py-10">
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.png" alt="Upload" className="size-12 md:size-16" />
                            </div>
                            <p>
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p>PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
export default FileUploader
