/**
 * Populates the column header titles and form labels safely via innerText.
 */
const fillColumnHeadersText = () => {
    for (let index = 0; index < appState.columns.length; index++) {
        const col = appState.columns[index]
        document.getElementById(`col-title-${col.id}`).innerText = col.title
        document.getElementById(`lbl-add-${col.id}`).innerText = `Neue Karte in ${col.title}`
        document.getElementById(`btn-add-${col.id}`).setAttribute("aria-label", `Karte zu ${col.title} hinzufügen`)
    }
}

/**
 * Renders all column containers into the board using innerHTML.
 */
const renderColumns = () => {
    const board = document.getElementById("board")
    board.innerHTML = ""
    for (let index = 0; index < appState.columns.length; index++) {
        const col = appState.columns[index]
        board.innerHTML += setColumnHtmlTemplate(col)
    }
    fillColumnHeadersText()
}

/**
 * Sets the accessible aria-label attributes on a card's action buttons.
 *
 * @param {Object} card - The card data object.
 */
const fillCardAriaLabels = (card) => {
    const editBtn = document.getElementById(`btn-edit-${card.id}`)
    const delBtn = document.getElementById(`btn-del-${card.id}`)
    const leftBtn = document.getElementById(`btn-left-${card.id}`)
    const rightBtn = document.getElementById(`btn-right-${card.id}`)
    editBtn.setAttribute("aria-label", `${card.title} bearbeiten`)
    delBtn.setAttribute("aria-label", `${card.title} löschen`)
    leftBtn.setAttribute("aria-label", `${card.title} nach links verschieben`)
    rightBtn.setAttribute("aria-label", `${card.title} nach rechts verschieben`)
}

/**
 * Populates the text and ARIA labels of all cards within a column via innerText.
 *
 * @param {Array<Object>} cards - List of cards in the column.
 */
const fillColumnCardsText = (cards) => {
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index]
        const colTitle = getColumnTitle(card.status)
        document.getElementById(`card-title-${card.id}`).innerText = card.title
        document.getElementById(`card-prio-${card.id}`).innerText = getPriorityLabel(card.priority)
        document.getElementById(`card-meta-${card.id}`).innerText = `Status: ${colTitle}`
        fillCardAriaLabels(card)
    }
}

/**
 * Renders all cards of a single column using innerHTML and innerText.
 *
 * @param {Object} col - The column data object to render.
 */
const renderColumnCards = (col) => {
    const body = document.getElementById(`col-body-${col.id}`)
    const cards = getCardsByColumn(col.id)
    body.innerHTML = ""
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index]
        const canLeft = getNeighbourColumn(card.status, -1) !== null
        const canRight = getNeighbourColumn(card.status, 1) !== null
        body.innerHTML += setCardHtmlTemplate(card, canLeft, canRight)
    }
    fillColumnCardsText(cards)
    document.getElementById(`col-count-${col.id}`).innerText = `${cards.length}`
}

/**
 * Fills the edit modal form inputs with the selected card's current values.
 *
 * @param {Object} card - The card object being edited.
 */
const renderEditModalFields = (card) => {
    document.getElementById("edit-title").value = card.title
    document.getElementById("edit-priority").value = card.priority
    document.getElementById("modal-card-id").innerText = `Karten-ID: ${card.id}`
}

/**
 * Updates the total card counter badge in the top bar via innerText.
 */
const renderCardCounter = () => {
    const counter = document.getElementById("card-counter")
    counter.innerText = `${appState.cards.length} Karten im State`
}

/**
 * Renders all columns' cards and updates the total counter.
 */
const renderBoard = () => {
    for (let index = 0; index < appState.columns.length; index++) {
        renderColumnCards(appState.columns[index])
    }
    renderCardCounter()
}

/**
 * Writes a status message into the ARIA live region via innerText.
 *
 * @param {string} message - Message to announce to screen readers.
 */
const announceToScreenReader = (message) => {
    const region = document.getElementById("live-region")
    region.innerText = message
}