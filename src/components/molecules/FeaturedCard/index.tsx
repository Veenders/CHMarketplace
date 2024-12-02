import styles from './featuredcard.module.css'
const FeaturedCard = () => {
  return(
    <div className={styles.featuredCard}>
      <div className={styles.featuredTextBox}>
        <h6>Ratgeber</h6>
        <p>Beschwerdefrei durch den Frühling. Diese Produkte helfen bei Heuschnupfen.</p>
      </div>
      <button>Mehr erfahren</button>
    </div>
  )
}

export default FeaturedCard