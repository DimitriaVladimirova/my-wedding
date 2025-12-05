import { get } from "./api"

export function getLocations() {
  return get("/data/locations");
}

export function getMenus() {
  return get("/data/menus");
}

export function getColors() {
  return get("/data/colors");
}

export function getLocationById(id) {
    return get(`/data/locations/${id}`)
}

export function getMenuById(id) {
  return get(`/data/menus/${id}`)
}