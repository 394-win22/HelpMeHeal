export const Loading = ({isMobile}) => {
    return (
        <div>
            <img alt="loading"
                 src="https://s2.loli.net/2022/03/06/nmw2v9QBlacGj36.gif"
                 style={{position: "absolute",
                     width: isMobile ? "100%": "25%",
                     height: isMobile ? "40%" : "40%",
                     margin: "auto",
                     left: "0",
                     right: "0",
                     top: "0",
                     bottom: "0"}} />
        </div>
    )
}