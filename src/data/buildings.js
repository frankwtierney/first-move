// UB Campus Living residential buildings for the intro picker, grouped by area
// in display order. Source of truth mirrors the ResLife hierarchy used in the
// Budget-Tracker (src/lib/structure.js): 5 residential areas, 18 buildings.
// Residential Education (central admin) has no buildings and is omitted.
//
// The stored value is the building name (goes into first_move_results.building).
export const buildingGroups = [
  { area: 'Ellicott South', buildings: ['Greiner Hall', 'Fargo Quad', 'Evans Quad', 'Red Jacket Quad'] },
  { area: 'Ellicott East', buildings: ['Wilkeson Quad', 'Spaulding Quad', 'Richmond Quad'] },
  { area: 'Governors', buildings: ['Lehman Hall', 'Dewey Hall', 'Roosevelt Hall', 'Clinton Hall'] },
  { area: 'Main Street', buildings: ['Goodyear Hall', 'Clement Hall'] },
  { area: 'Apartments', buildings: ['South Lake Village', 'Hadley Village', 'Flickinger Village', 'Flint Village', 'Creekside Village'] },
  // Test-only area/building — not real ResLife data; safe to remove after testing.
  { area: 'ResEd', buildings: ['Blake Center'] },
]

// Flat list of all building names (used for the presence check / fallback).
export const buildings = buildingGroups.flatMap((g) => g.buildings)
