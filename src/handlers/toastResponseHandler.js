import { toast } from 'react-toastify';

//function that handles the responses of other functions 
export default function (resBody, onSuccess) {
    if (resBody.success === true) {
        onSuccess();
        toast.success(`${resBody.message}`, {
            closeButton: false,
            autoClose: true
        });
    }
    else {
        if (resBody.errors) {
            for (let err in resBody.errors) {
                toast.error(`${resBody.errors[err]}`, {
                    closeButton: false,
                    autoClose: true
                });
            }
        }
        else if (resBody.message) {
            toast.error(`${resBody.message}`, {
                closeButton: false,
                autoClose: true
            });
        }
    }
}