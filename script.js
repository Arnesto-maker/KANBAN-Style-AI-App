/**
 * Validates that a card title is between 3 and 120 characters after trimming.
 *
 * @param {string} rawText - Raw input string from the form field.
 * @returns {Object} The validation data template object.
 */
const validateCardTitle = (rawText) => {
    const clean = rawText.trim()
    const isValid = clean.length >= 3 && clean.length <= 120
    return setValidationDataTemplate(isValid, clean)
}

/**
 * Executes the validation workflow for a specific column input via callbacks.
 *
 * @param {string} colId - Column ID whose input is validated.
 * @param {Function} validateCallback - Validation logic callback.
 * @param {Function} uiCallback - UI error display callback.
 * @returns {Object} The validation result object.
 */
const initColumnValidation = (colId, validateCallback, uiCallback) => {
    const input = document.getElementById(`add-${colId}`)
    const result = validateCallback(input.value)
    uiCallback(colId, result.valid)
    return result
}

/**
 * Executes the validation workflow for the edit modal input via callbacks.
 *
 * @param {Function} validateCallback - Validation logic callback.
 * @param {Function} uiCallback - UI error display callback.
 * @returns {Object} The validation result object.
 */
const initEditValidation = (validateCallback, uiCallback) => {
    const input = document.getElementById("edit-title")
    const result = validateCallback(input.value)
    uiCallback(result.valid)
    return result
}

/**
 * Handles the inline onsubmit event of a column's add-card form.
 *
 * @param {SubmitEvent} event - The form submit event.
 * @param {string} colId - Target column ID.
 */
const handleAddSubmit = (event, colId) => {
    event.preventDefault()
    const result = initColumnValidation(colId, validateCardTitle, setFormErrorUi)
    if (result.valid === true) {
        addCardToState(result.value, colId)
        document.getElementById(`add-${colId}`).value = ""
        commitBoardChange(`Karte ${result.value} zu ${getColumnTitle(colId)} hinzugefügt.`)
    }
}

/**
 * Handles the inline onsubmit event of the edit card modal form.
 *
 * @param {SubmitEvent} event - The form submit event.
 */
const handleEditSubmit = (event) => {
    event.preventDefault()
    const result = initEditValidation(validateCardTitle, setEditFormErrorUi)
    if (result.valid === true && appState.editCardId !== null) {
        const prio = document.getElementById("edit-priority").value
        updateCardDetailsInState(appState.editCardId, result.value, prio)
        closeEditModal()
        commitBoardChange(`Karte ${result.value} aktualisiert.`)
    }
}

/**
 * Initializes the application via the body onload attribute.
 */
const init = () => {
    loadCardsFromStorage()
    renderColumns()
    renderBoard()
}