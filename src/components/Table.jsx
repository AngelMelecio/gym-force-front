import React from 'react'

const Table = ({
    titleAttrs,
    subTitleAtrrs,
    Info,
    infoAttr,
    data,
}) => {
    return (
        <div>
            {
                data?.map((item, i) =>
                    <div>
                        <p>{titleAttrs?.map(atr => <>{item[atr]}</>)}</p>
                        <p>{subTitleAtrrs?.map(atr => <>{item[atr]}</>)}</p>
                        <p>
                            {Info( item[infoAttr] )}
                        </p>
                    </div>
                )
            }

        </div>
    )
}

export default Table