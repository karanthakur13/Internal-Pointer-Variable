pragma solidity ^0.8.0;

contract ProductRegistry {
    // Structure to store product details
    struct Product {
        address owner;
        uint carbonEmission;
        uint waterUsage;
        uint energyEfficiency;
        uint wasteGeneration;
        uint renewableEnergyUsage;
        string biodiversityUsage;
    }

    // Mapping to store product details by a unique product ID
    mapping(uint256 => Product) products;

    uint256 productCount;

    // Event to log when a new product is added
    event ProductAdded(uint256 productId, address owner);

    // Function to add product details
    function addProduct(
        uint _carbonEmission,
        uint _waterUsage,
        uint _energyEfficiency,
        uint _wasteGeneration,
        uint _renewableEnergyUsage,
        string memory _biodiversityUsage
    ) public {
        // Increment the product count to generate a unique product ID
        productCount++;

        // Store the product details in the mapping
        products[productCount] = Product({
            owner: msg.sender,
            carbonEmission: _carbonEmission,
            waterUsage: _waterUsage,
            energyEfficiency: _energyEfficiency,
            wasteGeneration: _wasteGeneration,
            renewableEnergyUsage: _renewableEnergyUsage,
            biodiversityUsage: _biodiversityUsage
        });

        // Emit an event to log the addition of the product
        emit ProductAdded(productCount, msg.sender);
    }

    function updateProduct(
        uint _productId,
        uint _carbonEmission,
        uint _waterUsage,
        uint _energyEfficiency,
        uint _wasteGeneration,
        uint _renewableEnergyUsage
    ) public {
        products[_productId].carbonEmission =
            products[_productId].carbonEmission +
            _carbonEmission;
        products[_productId].waterUsage =
            products[_productId].waterUsage +
            _waterUsage;
        products[_productId].energyEfficiency =
            products[_productId].energyEfficiency +
            _energyEfficiency;
        products[_productId].wasteGeneration =
            products[_productId].wasteGeneration +
            _wasteGeneration;
        products[_productId].renewableEnergyUsage =
            products[_productId].renewableEnergyUsage +
            _renewableEnergyUsage;
    }

    // Function to convert biodiversity string to integer
    function biodiversityStringToUint(
        string memory biodiversity
    ) internal pure returns (uint) {
        if (
            keccak256(abi.encodePacked(biodiversity)) ==
            keccak256(abi.encodePacked("Low"))
        ) {
            return 0;
        } else if (
            keccak256(abi.encodePacked(biodiversity)) ==
            keccak256(abi.encodePacked("Medium"))
        ) {
            return 1;
        } else if (
            keccak256(abi.encodePacked(biodiversity)) ==
            keccak256(abi.encodePacked("High"))
        ) {
            return 2;
        }
        revert("Invalid biodiversity level");
    }

    // Function to retrieve product details by product ID
    function getProduct(
        uint256 productId
    )
        public
        view
        returns (
            address owner,
            uint carbonEmission,
            uint waterUsage,
            uint energyEfficiency,
            uint wasteGeneration,
            uint renewableEnergyUsage,
            uint biodiversityUsage
        )
    {
        require(
            productId <= productCount && productId > 0,
            "Product does not exist"
        );
        Product storage product = products[productId];

        uint convertedBiodiversity = biodiversityStringToUint(
            product.biodiversityUsage
        );

        return (
            product.owner,
            product.carbonEmission,
            product.waterUsage,
            product.energyEfficiency,
            product.wasteGeneration,
            product.renewableEnergyUsage,
            convertedBiodiversity
        );
    }
}
