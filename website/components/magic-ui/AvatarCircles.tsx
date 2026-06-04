import { AvatarCircles } from "../ui/avatar-circles";

const avatars = [
  {
    imageUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539847/allure_so2b7p.jpg",
    profileUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539847/allure_so2b7p.jpg",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/aman-motors.jpg_gsrrtd.jpg",
    profileUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/aman-motors.jpg_gsrrtd.jpg",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/belleza_umsgkj.jpg",
    profileUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/belleza_umsgkj.jpg",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/Bunty_Mart_1_fpw0nz.png",
    profileUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/Bunty_Mart_1_fpw0nz.png",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/mango-tree_cykmon.jpg",
    profileUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/mango-tree_cykmon.jpg",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/odyssefy_rva7dz.jpg",
    profileUrl:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1779539848/odyssefy_rva7dz.jpg",
  },
];

export function AvatarCirclesRow() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />;
}
