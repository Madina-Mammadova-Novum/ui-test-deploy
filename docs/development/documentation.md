# Documentation Standards

Clear, comprehensive documentation is essential for maintaining a complex maritime B2B platform. These standards ensure that all team members understand both the technical implementation and maritime business context of our codebase. Our documentation requirements emphasize the connection between shipping industry requirements and technical solutions, making it easier to maintain and extend the platform's capabilities.

## Component Documentation

/\*\*

- @component VesselCard
- @description Displays vessel details in a card format
- @props {Vessel} vessel - Vessel details object
- @maritime Shows DWT, vessel type, and current position
  \*/

## Utility Documentation

/\*\*

- @util convertToDWT
- @description Converts metric tons to deadweight tonnage
- @param {number} mt - Weight in metric tons
- @returns {number} Weight in DWT
- @example convertToDWT(50000) // returns 49289.3
  \*/

## Service Documentation

/\*\*

- @service VesselSearch
- @description Searches vessels based on criteria
- @endpoint /api/v1/vessels/search
- @method POST
- @business Filters by vessel type, DWT, and position
  \*/

## TODO Format

// TODO(username): Description [Priority] [Ticket]
// Example: TODO(john): Add vessel speed validation [P2] [SL-123]
