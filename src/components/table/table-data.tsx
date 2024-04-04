import { ComponentProps } from "react";

interface TableDataProps extends ComponentProps<'td'> {
    textRight?: boolean
}

export function TableData({textRight, ...props}: TableDataProps) {
    return (
        <td
            {...props}
            className={textRight
                ? "py-3 px-4 text-small text-zinc-300 text-right"
                : "py-3 px-4 text-small text-zinc-300"
            }
        />
    )
}