import { useContext } from "react"
import { PermissionsContext } from "../context/permissions"

export const usePermissions = () => {
    const context = useContext(PermissionsContext)

    if (!context) {
        throw new Error('usePermissions must be used within a PermissionsProvider')
    }

    return context
}
