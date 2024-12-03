Feature: Mobile CH Marketplace

  Scenario: visiting the mainpage
    Given I visit CH Marketplace
    When I should see the main page
    Then I could see "Multivitamin-Mineral CELA Tabletten" product
    And I could see "B-Komplex Tabletten" product
    And I could see "Zink-C Toffees" product
    And I could see "Omega-3 DHA Kapseln" product
    And I could add a product to the shopping Cart
    And I could remove a product to the shopping Cart