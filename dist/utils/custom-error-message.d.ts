export declare const ErrorMessages: {
    readonly REQUIRED: "This field is required";
    readonly INVALID_UUID: "Invalid UUID format";
    readonly INVALID_DATE: "Invalid date format";
    readonly FUTURE_DATE_REQUIRED: "Date must be in the future";
    readonly PAST_DATE_INVALID: "Date cannot be in the future";
    readonly RECURRING_FREQUENCY_REQUIRED: "Recurring frequency is required when task is recurring";
    readonly RECURRING_FIELDS_INVALID: "Recurring fields should only be set when task is recurring";
    readonly TITLE_TOO_LONG: "Title must not exceed 200 characters";
    readonly DESCRIPTION_TOO_LONG: "Description must not exceed 2000 characters";
    readonly INVALID_RELATIONSHIP: "Related object ID must be provided when object is set";
    readonly INVALID_TIMESTAMPS: "Updated date must be equal to or after created date";
};
