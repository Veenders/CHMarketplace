'use client'
import { useState } from "react";
import styles from "./drawer.module.css";

type DrawerProps = {
  quantity: number
  children: React.ReactNode
}

const ChaironSVG = () => {
  return (
    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 8L12 17L3 8" stroke="#3C3C3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>)

}

const Drawer = ({children, quantity}:DrawerProps) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  }
  const onDragStart = () => {
    setOpen(!open);
  }
  return (
    <div className={styles.drawer} style={{backgroundColor: open?'none':'#3C3C3B40'}}>
      {open && <div className={styles.drawerBackground} onClick={toggleDrawer}/>}
      <div className={`${styles.toggleDrawer} ${open ? styles.toggleDrawerOpened:""}`}>
        <div className={styles.puller} draggable onDragStart={onDragStart} onClick={toggleDrawer}/>
        {open ? (
          <div className={styles.drawerContainer}>
            <div className={styles.openedHeader}>
              <button onClick={toggleDrawer}>
                <ChaironSVG />
              </button>
              <h3>Zum Warenkorb hinzugefügt</h3>
              <p>{quantity} Produkte</p>
            </div>
            {children}
          </div>
        ) : (
          <div className={styles.header}>
            <p>{quantity} Produkte</p>
            <button onClick={toggleDrawer}>Zur Übersicht</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drawer