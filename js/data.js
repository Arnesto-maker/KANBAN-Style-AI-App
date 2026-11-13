const STORAGE_KEY = "arnesto-kanban-v2"

const appState = {
    "columns": [
        setColumnDataTemplate("todo", "1. Backlog"),
        setColumnDataTemplate("doing", "2. In Arbeit"),
        setColumnDataTemplate("review", "3. Prüfung"),
        setColumnDataTemplate("done", "4. Erledigt")
    ],
    "cards": [],
    "dragId": null,
    "editCardId": null
}

/**
 * Returns the default seed cards for the initial board state.
 *
 * @returns {Array<Object>} List of initial card objects.
 */
const getInitialCards = () => {
    return [
        setCardDataTemplate("Anforderungen sammeln", "todo", "high"),
        setCardDataTemplate("Layout umsetzen", "doing", "medium"),
        setCardDataTemplate("Barrierefreiheit prüfen", "review", "low")
    ]
}

/**
 * Returns the German display label for a card priority key.
 *
 * @param {string} priority - Priority key (low, medium, high).
 * @returns {string} Display label in German.
 */
const getPriorityLabel = (priority) => {
    if (priority === "high") {
        return "Hoch"
    }
    if (priority === "low") {
        return "Niedrig"
    }
    return "Mittel"
}

/**
 * Loads cards from localStorage or initializes default seed cards.
 */
const loadCardsFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
        appState.cards = JSON.parse(stored)
    } else {
        appState.cards = getInitialCards()
    }
}

/**
 * Saves the current cards array from state into localStorage.
 */
const saveCardsToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState.cards))
}

/**
 * Finds and returns a card object by its unique ID.
 *
 * @param {string} id - The card ID to search for.
 * @returns {Object|null} The matching card object or null.
 */
const findCardById = (id) => {
    for (let index = 0; index < appState.cards.length; index++) {
        if (appState.cards[index].id === id) {
            return appState.cards[index]
        }
    }
    return null
}

/**
 * Finds the array index of a column by its column ID.
 *
 * @param {string} colId - The column ID to locate.
 * @returns {number} The array index or -1 if not found.
 */
const getColumnIndex = (colId) => {
    for (let index = 0; index < appState.columns.length; index++) {
        if (appState.columns[index].id === colId) {
            return index
        }
    }
    return -1
}

/**
 * Returns the ID of a neighbouring column based on a step offset.
 *
 * @param {string} colId - Current column ID.
 * @param {number} step - Direction offset (-1 for left, 1 for right).
 * @returns {string|null} Neighbour column ID or null at boundaries.
 */
const getNeighbourColumn = (colId, step) => {
    const nextIndex = getColumnIndex(colId) + step
    const target = appState.columns[nextIndex]
    if (target !== undefined) {
        return target.id
    } else {
        return null
    }
}

/**
 * Returns the display title of a column by its ID.
 *
 * @param {string} colId - The column ID.
 * @returns {string} The column title.
 */
const getColumnTitle = (colId) => {
    const colIndex = getColumnIndex(colId)
    return appState.columns[colIndex].title
}

/**
 * Collects all cards belonging to a specific column ID.
 *
 * @param {string} colId - The column ID to filter by.
 * @returns {Array<Object>} Array of matching card objects.
 */
const getCardsByColumn = (colId) => {
    const result = []
    for (let index = 0; index < appState.cards.length; index++) {
        if (appState.cards[index].status === colId) {
            result.push(appState.cards[index])
        }
    }
    return result
}

/**
 * Appends a new card object with default medium priority to the state.
 *
 * @param {string} title - Task title text.
 * @param {string} colId - Target column ID.
 */
const addCardToState = (title, colId) => {
    const newCard = setCardDataTemplate(title, colId, "medium")
    appState.cards.push(newCard)
}

/**
 * Updates the title and priority of an existing card in the state.
 *
 * @param {string} id - Unique ID of the card to update.
 * @param {string} newTitle - Validated new title text.
 * @param {string} newPriority - Selected priority key.
 */
const updateCardDetailsInState = (id, newTitle, newPriority) => {
    const card = findCardById(id)
    if (card !== null) {
        card.title = newTitle
        card.priority = newPriority
    }
}

/**
 * Removes a card from the application state by its ID.
 *
 * @param {string} id - Unique ID of the card to remove.
 */
const removeCardFromState = (id) => {
    for (let index = 0; index < appState.cards.length; index++) {
        if (appState.cards[index].id === id) {
            appState.cards.splice(index, 1)
            return
        }
    }
}

/**
 * Updates the status column of a specific card in the state.
 *
 * @param {string} id - Unique ID of the card to move.
 * @param {string} colId - New target column ID.
 */
const moveCardInState = (id, colId) => {
    const card = findCardById(id)
    if (card !== null) {
        card.status = colId
    }
}

/**
 * Empties the entire cards array in the application state.
 */
const clearCardsInState = () => {
    appState.cards = []
}