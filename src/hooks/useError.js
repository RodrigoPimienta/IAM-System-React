import { useContext } from "react"
import { ErrorContext } from "../context/error"

export const useError = () => {
    const context = useContext(ErrorContext)

    if (!context) {
        throw new Error('useAuth must be used within a ErrorProvider')
    }

    return context

}
