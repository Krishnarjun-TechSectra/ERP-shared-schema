"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessages = void 0;
exports.ErrorMessages = {
    REQUIRED: "This field is required",
    INVALID_UUID: "Invalid UUID format",
    INVALID_DATE: "Invalid date format",
    FUTURE_DATE_REQUIRED: "Date must be in the future",
    PAST_DATE_INVALID: "Date cannot be in the future",
    RECURRING_FREQUENCY_REQUIRED: "Recurring frequency is required when task is recurring",
    RECURRING_FIELDS_INVALID: "Recurring fields should only be set when task is recurring",
    TITLE_TOO_LONG: "Title must not exceed 200 characters",
    DESCRIPTION_TOO_LONG: "Description must not exceed 2000 characters",
    INVALID_RELATIONSHIP: "Related object ID must be provided when the related object is set",
    INVALID_TIMESTAMPS: "Updated date must be equal to or after created date",
};
