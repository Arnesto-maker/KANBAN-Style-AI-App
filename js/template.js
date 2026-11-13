/**
 * Creates a standardized column data object.
 *
 * @param {string} id - Unique column identifier.
 * @param {string} title - Display title of the column.
 * @returns {Object} The structured column data template.
 */
const setColumnDataTemplate = (id, title) => {
    return {
        "id": id,
        "title": title
    }
}

/**
 * Creates a standardized card data object including priority.
 *
 * @param {string} title - Task description text.
 * @param {string} status - Assigned column identifier.
 * @param {string} priority - Priority level (low, medium, high).
 * @returns {Object} The structured card data template.
 */
const setCardDataTemplate = (title, status, priority) => {
    return {
        "id": `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        "title": title,
        "status": status,
        "priority": priority
    }
}

/**
 * Creates a standardized validation result object.
 *
 * @param {boolean} isValid - Whether validation succeeded.
 * @param {string} cleanValue - The trimmed input string.
 * @returns {Object} The structured validation data template.
 */
const setValidationDataTemplate = (isValid, cleanValue) => {
    return {
        "valid": isValid,
        "value": cleanValue
    }
}

/**
 * Returns the disabled HTML attribute string without using a ternary operator.
 *
 * @param {boolean} isEnabled - Whether the button action is possible.
 * @returns {string} Empty string if enabled, otherwise disabled attribute.
 */
const getDisabledAttrTemplate = (isEnabled) => {
    if (isEnabled === true) {
        return ""
    } else {
        return "disabled"
    }
}

/**
 * Returns the CSS class string for a card priority badge.
 *
 * @param {string} priority - Priority key (low, medium, high).
 * @returns {string} The CSS class names for the badge.
 */
const getPriorityClassTemplate = (priority) => {
    if (priority === "high") {
        return "prio-badge prio-high"
    }
    if (priority === "low") {
        return "prio-badge prio-low"
    }
    return "prio-badge prio-medium"
}

/**
 * Generates the HTML template string for a board column with inline events.
 *
 * @param {Object} col - The column data object.
 * @returns {string} The HTML markup string for the column.
 */
const setColumnHtmlTemplate = (col) => {
    return `<article class="board-col" id="col-${col.id}" aria-labelledby="col-title-${col.id}" ondragover="handleDragOver(event, '${col.id}')" ondragleave="handleDragLeave('${col.id}')" ondrop="handleDrop(event, '${col.id}')">
        <h2 class="col-header"><span id="col-title-${col.id}"></span><span id="col-count-${col.id}" class="col-count">0</span></h2>
        <ul id="col-body-${col.id}" class="col-body"></ul>
        <form class="add-form" onsubmit="handleAddSubmit(event, '${col.id}')" novalidate>
            <label id="lbl-add-${col.id}" for="add-${col.id}" class="sr-only"></label>
            <div class="add-row">
                <input id="add-${col.id}" type="text" placeholder="Neue Karte..." autocomplete="off" aria-describedby="err-${col.id}" aria-invalid="false">
                <button type="submit" id="btn-add-${col.id}" class="btn-primary">+</button>
            </div>
            <p id="err-${col.id}" class="error-msg" role="alert">Bitte 3 bis 120 Zeichen eingeben.</p>
        </form>
    </article>`
}

/**
 * Generates the top header row HTML template for a task card.
 *
 * @param {Object} card - The card data object.
 * @param {string} prioClass - CSS class for the priority badge.
 * @returns {string} The HTML markup string for the card top bar.
 */
const setCardTopHtmlTemplate = (card, prioClass) => {
    return `<div class="task-card-top">
        <span id="card-prio-${card.id}" class="${prioClass}"></span>
        <div class="card-top-btns">
            <button type="button" id="btn-edit-${card.id}" class="btn-icon" onclick="openEditModal('${card.id}')">&#9998;</button>
            <button type="button" id="btn-del-${card.id}" class="btn-delete-card" onclick="handleDeleteCard('${card.id}')">&#10005;</button>
        </div>
    </div>`
}

/**
 * Generates the bottom directional buttons HTML template for a task card.
 *
 * @param {Object} card - The card data object.
 * @param {string} leftAttr - Disabled attribute for left button.
 * @param {string} rightAttr - Disabled attribute for right button.
 * @returns {string} The HTML markup string for the card actions.
 */
const setCardActionsHtmlTemplate = (card, leftAttr, rightAttr) => {
    return `<div class="card-actions">
        <button type="button" id="btn-left-${card.id}" class="btn-icon" onclick="handleMoveCard('${card.id}', -1)" ${leftAttr}>&#8592;</button>
        <button type="button" id="btn-right-${card.id}" class="btn-icon" onclick="handleMoveCard('${card.id}', 1)" ${rightAttr}>&#8594;</button>
    </div>`
}

/**
 * Generates the full HTML template string for a task card.
 *
 * @param {Object} card - The card data object.
 * @param {boolean} canLeft - Whether moving left is possible.
 * @param {boolean} canRight - Whether moving right is possible.
 * @returns {string} The HTML markup string for the card.
 */
const setCardHtmlTemplate = (card, canLeft, canRight) => {
    const leftAttr = getDisabledAttrTemplate(canLeft)
    const rightAttr = getDisabledAttrTemplate(canRight)
    const prioClass = getPriorityClassTemplate(card.priority)
    const topHtml = setCardTopHtmlTemplate(card, prioClass)
    const actionsHtml = setCardActionsHtmlTemplate(card, leftAttr, rightAttr)
    return `<li class="task-card" id="card-${card.id}" draggable="true" ondragstart="handleDragStart(event, '${card.id}')" ondragend="handleDragEnd()">
        ${topHtml}
        <p id="card-title-${card.id}" class="task-title"></p>
        <p id="card-meta-${card.id}" class="task-meta"></p>
        ${actionsHtml}
    </li>`
}