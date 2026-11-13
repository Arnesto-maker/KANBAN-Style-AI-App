/**
 * Saves the state, re-renders the board, and announces the change.
 *
 * @param {string} message - Screen reader announcement text.
 */
const commitBoardChange = (message) => {
    saveCardsToStorage()
    renderBoard()
    announceToScreenReader(message)
}

/**
 * Updates the visual error state of a column input field without ternary operators.
 *
 * @param {string} colId - Target column ID.
 * @param {boolean} isValid - Whether the current input is valid.
 */
const setFormErrorUi = (colId, isValid) => {
    const input = document.getElementById(`add-${colId}`)
    const error = document.getElementById(`err-${colId}`)
    if (isValid === true) {
        error.classList.remove("is-visible")
        input.setAttribute("aria-invalid", "false")
    } else {
        error.classList.add("is-visible")
        input.setAttribute("aria-invalid", "true")
    }
}

/**
 * Updates the visual error state of the edit modal title input.
 *
 * @param {boolean} isValid - Whether the modal input is valid.
 */
const setEditFormErrorUi = (isValid) => {
    const input = document.getElementById("edit-title")
    const error = document.getElementById("err-edit")
    if (isValid === true) {
        error.classList.remove("is-visible")
        input.setAttribute("aria-invalid", "false")
    } else {
        error.classList.add("is-visible")
        input.setAttribute("aria-invalid", "true")
    }
}

/**
 * Opens the edit modal for a specific card and focuses the title input.
 *
 * @param {string} cardId - ID of the card to edit.
 */
const openEditModal = (cardId) => {
    const card = findCardById(cardId)
    if (card !== null) {
        appState.editCardId = card.id
        renderEditModalFields(card)
        setEditFormErrorUi(true)
        document.getElementById("edit-backdrop").classList.remove("d-none")
        document.getElementById("edit-title").focus()
    }
}

/**
 * Closes the edit modal and resets the active edit card ID.
 */
const closeEditModal = () => {
    appState.editCardId = null
    document.getElementById("edit-backdrop").classList.add("d-none")
}

/**
 * Prevents clicks inside the modal box from closing the backdrop.
 *
 * @param {MouseEvent} event - The click event inside the modal.
 */
const stopModalClick = (event) => {
    event.stopPropagation()
}

/**
 * Moves a card left or right when its directional button is clicked.
 *
 * @param {string} cardId - ID of the card to move.
 * @param {number} step - Direction offset (-1 or 1).
 */
const handleMoveCard = (cardId, step) => {
    const card = findCardById(cardId)
    if (card !== null) {
        const targetCol = getNeighbourColumn(card.status, step)
        if (targetCol !== null) {
            moveCardInState(card.id, targetCol)
            commitBoardChange(`Karte ${card.title} nach ${getColumnTitle(targetCol)} verschoben.`)
        }
    }
}

/**
 * Deletes a card when its remove button is clicked.
 *
 * @param {string} cardId - ID of the card to delete.
 */
const handleDeleteCard = (cardId) => {
    const card = findCardById(cardId)
    if (card !== null) {
        removeCardFromState(card.id)
        commitBoardChange(`Karte ${card.title} gelöscht.`)
    }
}

/**
 * Clears all cards from the board when the reset button is clicked.
 */
const handleClearBoard = () => {
    clearCardsInState()
    commitBoardChange("Board komplett geleert.")
}

/**
 * Stores the dragged card ID and applies the dragging style class.
 *
 * @param {DragEvent} event - The dragstart event.
 * @param {string} cardId - ID of the dragged card.
 */
const handleDragStart = (event, cardId) => {
    appState.dragId = cardId
    event.currentTarget.classList.add("is-dragging")
}

/**
 * Allows dropping on a column and highlights the target column.
 *
 * @param {DragEvent} event - The dragover event.
 * @param {string} colId - Hovered column ID.
 */
const handleDragOver = (event, colId) => {
    event.preventDefault()
    const colEl = document.getElementById(`col-${colId}`)
    colEl.classList.add("is-over")
}

/**
 * Removes the drop highlight from a column without using event.relatedTarget.
 *
 * @param {string} colId - Left column ID.
 */
const handleDragLeave = (colId) => {
    const colEl = document.getElementById(`col-${colId}`)
    colEl.classList.remove("is-over")
}

/**
 * Handles dropping a card into a column and updates its status.
 *
 * @param {DragEvent} event - The drop event.
 * @param {string} colId - Target column ID where the card was dropped.
 */
const handleDrop = (event, colId) => {
    event.preventDefault()
    document.getElementById(`col-${colId}`).classList.remove("is-over")
    const card = findCardById(appState.dragId)
    appState.dragId = null
    if (card !== null && card.status !== colId) {
        moveCardInState(card.id, colId)
        commitBoardChange(`Karte ${card.title} nach ${getColumnTitle(colId)} verschoben.`)
    }
}

/**
 * Resets the drag state and refreshes the board after dragging ends.
 */
const handleDragEnd = () => {
    appState.dragId = null
    renderBoard()
}