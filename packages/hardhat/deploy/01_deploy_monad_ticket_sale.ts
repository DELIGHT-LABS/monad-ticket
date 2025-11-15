import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys MonadTicketSale contract for NFT-based ticketing system
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployMonadTicketSale: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("🎫 Deploying MonadTicketSale contract...");
  console.log("Deployer address:", deployer);

  await deploy("MonadTicketSale", {
    from: deployer,
    args: [], // No constructor arguments
    log: true,
    autoMine: true,
  });

  // Get the deployed contract
  const monadTicketSale = await hre.ethers.getContract<Contract>("MonadTicketSale", deployer);
  const contractAddress = await monadTicketSale.getAddress();

  console.log("✅ MonadTicketSale deployed to:", contractAddress);
  console.log("🎟️  NFT Name:", await monadTicketSale.name());
  console.log("🎟️  NFT Symbol:", await monadTicketSale.symbol());
  console.log("\n📅 Creating sample events...\n");

  // Helper function to get future date
  const getFutureDate = (daysFromNow: number) => {
    return Math.floor(Date.now() / 1000) + 86400 * daysFromNow;
  };

  // Event 1: BTS Concert (Large event with 3 tiers)
  try {
    const tx1 = await monadTicketSale.createEvent(
      "BTS World Tour - Seoul",
      getFutureDate(30),
      ["VIP", "Standard", "Economy"],
      [hre.ethers.parseEther("1.5"), hre.ethers.parseEther("0.8"), hre.ethers.parseEther("0.3")],
      [3, 5, 10],
      [
        ["VIP-A01", "VIP-A02", "VIP-A03"],
        ["STD-B01", "STD-B02", "STD-B03", "STD-B04", "STD-B05"],
        ["ECO-C01", "ECO-C02", "ECO-C03", "ECO-C04", "ECO-C05", "ECO-C06", "ECO-C07", "ECO-C08", "ECO-C09", "ECO-C10"],
      ],
    );
    await tx1.wait();
    console.log("✅ Event 1: BTS World Tour - Seoul (18 seats)");
  } catch (error) {
    console.log("⚠️  Event 1 creation failed:", error);
  }

  // Event 2: IU Concert (Medium event with 2 tiers)
  try {
    const tx2 = await monadTicketSale.createEvent(
      "IU Love Poem Concert",
      getFutureDate(45),
      ["Premium", "General"],
      [hre.ethers.parseEther("1.2"), hre.ethers.parseEther("0.6")],
      [4, 8],
      [
        ["PRE-A01", "PRE-A02", "PRE-A03", "PRE-A04"],
        ["GEN-B01", "GEN-B02", "GEN-B03", "GEN-B04", "GEN-B05", "GEN-B06", "GEN-B07", "GEN-B08"],
      ],
    );
    await tx2.wait();
    console.log("✅ Event 2: IU Love Poem Concert (12 seats)");
  } catch (error) {
    console.log("⚠️  Event 2 creation failed:", error);
  }

  // Event 3: Rock Festival (Large festival with 4 tiers)
  try {
    const tx3 = await monadTicketSale.createEvent(
      "Monad Rock Festival 2025",
      getFutureDate(60),
      ["Diamond", "Gold", "Silver", "Bronze"],
      [
        hre.ethers.parseEther("2.0"),
        hre.ethers.parseEther("1.0"),
        hre.ethers.parseEther("0.5"),
        hre.ethers.parseEther("0.2"),
      ],
      [2, 3, 5, 6],
      [
        ["DIA-A01", "DIA-A02"],
        ["GLD-B01", "GLD-B02", "GLD-B03"],
        ["SLV-C01", "SLV-C02", "SLV-C03", "SLV-C04", "SLV-C05"],
        ["BRZ-D01", "BRZ-D02", "BRZ-D03", "BRZ-D04", "BRZ-D05", "BRZ-D06"],
      ],
    );
    await tx3.wait();
    console.log("✅ Event 3: Monad Rock Festival 2025 (16 seats)");
  } catch (error) {
    console.log("⚠️  Event 3 creation failed:", error);
  }

  // Event 4: Jazz Night (Small intimate event)
  try {
    const tx4 = await monadTicketSale.createEvent(
      "Monad Jazz Night",
      getFutureDate(20),
      ["Front Row", "Regular"],
      [hre.ethers.parseEther("0.9"), hre.ethers.parseEther("0.4")],
      [3, 5],
      [
        ["FR-A01", "FR-A02", "FR-A03"],
        ["REG-B01", "REG-B02", "REG-B03", "REG-B04", "REG-B05"],
      ],
    );
    await tx4.wait();
    console.log("✅ Event 4: Monad Jazz Night (8 seats)");
  } catch (error) {
    console.log("⚠️  Event 4 creation failed:", error);
  }

  // Event 5: Tech Conference (Single tier)
  try {
    const tx5 = await monadTicketSale.createEvent(
      "Monad Developer Conference 2025",
      getFutureDate(90),
      ["All Access"],
      [hre.ethers.parseEther("0.5")],
      [10],
      [["CONF-01", "CONF-02", "CONF-03", "CONF-04", "CONF-05", "CONF-06", "CONF-07", "CONF-08", "CONF-09", "CONF-10"]],
    );
    await tx5.wait();
    console.log("✅ Event 5: Monad Developer Conference 2025 (10 seats)");
  } catch (error) {
    console.log("⚠️  Event 5 creation failed:", error);
  }

  console.log("\n📊 Final Stats:");
  console.log("Total Events:", await monadTicketSale.getEventCount());

  const allEvents = await monadTicketSale.getAllEvents();
  let totalSeats = 0;
  for (const event of allEvents) {
    totalSeats += Number(event.totalTickets);
  }
  console.log("Total Seats Created:", totalSeats);
  console.log("\n🎉 Sample events created successfully!");
};

export default deployMonadTicketSale;

deployMonadTicketSale.tags = ["MonadTicketSale"];
