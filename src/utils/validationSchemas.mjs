//10.4 Validation: Use a schema to clean up the code. So if you have many fields to validate this will save you some lines of code
export const createUserValidationSchema = {
    userName: {

        isLength: {
            isLength: {
                options: {
                    min: 5,
                    max: 32
                }
            },
            errorMessage: "Username must be at least 5 characters with a max of 32 characters."
        },
        
        notEmpty: {
            errorMessage: "Username cannot be empty."
        },
        
        isString: {
            errorMessage: "Username must be a string."
        }

    },

    displayName: {
        notEmpty: {
            errorMessage: "Display name cannot be empty."
        }
    }
};
