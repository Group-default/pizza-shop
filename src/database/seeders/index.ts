import { addressSeeders } from "./address-seeders";
import { categorySeeders } from "./category-seeders";
import { customerSeeders } from "./customer-seeders";
import { neighborhoodSeeders } from "./neighborhood-seeders";
import { productSeeders } from "./product-seeders";

const runSedders = async () => {
  categorySeeders()
  neighborhoodSeeders()
  productSeeders()
  customerSeeders()
  addressSeeders()
}

runSedders()