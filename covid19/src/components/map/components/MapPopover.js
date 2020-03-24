import React from 'react'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'

const MapPopover = ({ show, target, selected, title, list: PopoverDataList }) => {
  return (
    <Overlay
      show={show}
      target={target}
      placement="top"
      container={document.getElementsByTagName('body')[0]}
      containerPadding={20}
    >
      {props => {
        let position = { x: 0, y: 0 }
        if (target !== null) {
          const { x, y, width } = target.getBoundingClientRect()
          position = { x: x + width, y }
        }
        return (
          <>
            {selected !== null &&
              <Popover
                className="covid19__popover"
                style={{ ...props.style, opacity: show ? 1 : 0, left: position.x, top: position.y }}
              >
                <Popover.Title as="h3">Situazione {title}</Popover.Title>
                <Popover.Content>
                  <PopoverDataList data={selected} />
                </Popover.Content>
              </Popover>
            }
          </>
        )
      }}
    </Overlay>
  )
}

export default MapPopover