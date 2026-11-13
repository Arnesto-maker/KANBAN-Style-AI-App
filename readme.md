# Kanban Task-Board // AI-Driven Software Engineering Benchmark

Dieses Repository dokumentiert einen praxisnahen Effizienz- und Geschwindigkeitstest in der modernen Softwareentwicklung. Ziel des Projekts ist der Nachweis, wie schnell und präzise sich eine vollwertige, barrierefreie Web-Applikation durch strukturierte Systemvorgaben und KI-gestützte Code-Synthese realisieren lässt.

Die gesamte Applikation – inklusive Drag-and-Drop-Steuerung, persistentem State-Management, Validierungslogik und interaktivem Bearbeitungs-Modal – wurde ohne externe Frameworks in wenigen Minuten vom ersten Prompt bis zum produktionsreifen Code umgesetzt.

---

## 📂 Projektstruktur

Das Projekt nutzt eine klar getrennte, modulare Dateistruktur nach dem Prinzip der *Separation of Concerns* (Trennung von Datenhaltung, Darstellung und Benutzerinteraktion):

```text
kanban-board-app/
├── README.md        # Projektdokumentation & Benchmark-Protokoll
├── index.html       # Semantisches HTML5-Grundgerüst & Dialog-Struktur
├── style.css        # Flüssig responsives Flexbox-Layout
├── template.js      # Zentrale Daten-Modelle & HTML-Markup-Vorlagen
├── data.js          # Applikations-State, Filterlogik & LocalStorage-Anbindung
├── render.js        # Zustandsgesteuertes DOM-Rendering & Text-Zuweisung
├── ui.js            # Benutzerinteraktionen, Modal-Steuerung & Drag-and-Drop
└── main.js          # Eingabevalidierung, Formular-Handler & Initialisierung
```

---

## ✨ Funktionsumfang

* **4-Spalten-Workflow:** Übersichtliche Aufgabenverwaltung über die Phasen *Backlog*, *In Arbeit*, *Prüfung* und *Erledigt*.
* **Interaktives Bearbeitungs-Modal:** Nachträgliches Anpassen von Aufgabentiteln und Prioritätsstufen (*Niedrig*, *Mittel*, *Hoch*) über einen barrierefreien Dialog.
* **Multi-Modale Bedienung:** Unterstützung für natives Drag-and-Drop sowie vollständige Tastatur- und Button-Steuerung für maximale Zugänglichkeit.
* **Persistente Datenhaltung:** Automatische Synchronisation des gesamten Board-Zustands im `localStorage` des Browsers.
* **Integrierte Formularvalidierung:** Echtzeit-Überprüfung aller Nutzereingaben mit visuellen und akustischen Rückmeldungen für Screenreader.
* **Barrierefreiheit & Responsivität:** Konsequent umgesetzt nach **WCAG 2.1 Level AA** und stufenlos skalierbar bis auf kompakte Viewports von $320\text{ px} \times 640\text{ px}$.

---

## ⏱️ Entwicklungs-Protokoll & Zeitstempel (Prompt-to-Code)

Die folgende Zeitleiste zeigt den realen Entwicklungsverlauf innerhalb der Test-Session – von der ersten Systemanalyse bis zur fertigen Applikation:

| Zeitfenster | Dauer | Phase | Meilenstein & Ergebnis |
| :--- | :--- | :--- | :--- |
| **00:00 – 01:15 Std.** | $75\text{ Min.}$ | **Phase 1: Systemplanung** | Analyse des Datenflusses, Definition der Schnittstellen und Erstellung des ersten Pipeline-Prototyps. |
| **01:15 – 01:30 Std.** | $15\text{ Min.}$ | **Phase 2: Qualitäts- & UI-Vorgaben** | Festlegung der Barrierefreiheits-Standards (WCAG 2.1 AA) und der responsiven Layout-Grenzen ($320\text{ px} \times 640\text{ px}$). |
| **01:30 – 01:38 Std.** | $8\text{ Min.}$ | **Phase 3: Code-Audit & Optimierung** | Automatisierte Prüfung bestehenden Beispiel-Codes auf Wartbarkeit sowie Reduktion unnötiger DOM-Abhängigkeiten. |
| **01:38 – 01:45 Std.** | $7\text{ Min.}$ | **Phase 4: Core Kanban-Board** | **Prompt-to-Code:** Vollständige Generierung des 4-Spalten-Kanban-Boards inklusive Drag-and-Drop und `localStorage`. |
| **01:45 – 01:52 Std.** | $7\text{ Min.}$ | **Phase 5: Feature-Erweiterung (Modal)** | **Prompt-to-Code:** Nahtlose Integration des Bearbeitungs-Dialogs und des Prioritäten-Systems ohne Refactoring-Verluste. |
| **Gesamtzeit** | **$< 2\text{ Std.}$** | **Abschluss** | **Zwei vollständige Web-Applikationen (Pipeline-Dashboard & Kanban-Board) produktionsreif fertiggestellt.** |

---

## 📈 Fazit des Effizienz-Tests

Das Experiment belegt, dass die Entwicklungsgeschwindigkeit moderner Softwareprojekte maßgeblich von der **Vorab-Strukturierung** abhängt:

1. **Planung schlägt Improvisation:** Durch klar abgegrenzte Verantwortlichkeiten der einzelnen Dateien entstehen selbst bei schnellen Feature-Erweiterungen (wie dem nachträglichen Edit-Modal) keinerlei Seiteneffekte im bestehenden Code.
2. **Wartbarkeit ab Sekunde eins:** Kurze, präzise dokumentierte Funktionen ermöglichen eine sofortige Fehlerdiagnose und machen aufwendiges Debugging überflüssig.
3. **Zero-Dependency-Performance:** Der Verzicht auf schwere Drittanbieter-Bibliotheken garantiert minimale Ladezeiten und langfristige Stabilität.

---

## 🚀 Lokaler Start

Für den Betrieb sind weder Build-Tools noch Paketmanager (`npm`, `vite` o. Ä.) erforderlich:

1. Repository klonen oder als ZIP-Archiv herunterladen.
2. Die Datei `index.html` direkt in einem modernen Webbrowser öffnen.