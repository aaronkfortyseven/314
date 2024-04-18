public class Buyer extends User {
    private List<String> savedProperties;

    public Buyer(String username, String password) {
        super(username, password);
        this.savedProperties = new ArrayList<>();
    }

    public void saveProperty(String propertyId) {
        savedProperties.add(propertyId);
        // Add logic to save the property to the database
    }

    public void unsaveProperty(String propertyId) {
        savedProperties.remove(propertyId);
        // Add logic to remove the property from the saved list in the database
    }

    public List<String> getSavedProperties() {
        return savedProperties;
    }

    // Other methods specific to Buyer, like searching properties, viewing saved properties, etc.
}
