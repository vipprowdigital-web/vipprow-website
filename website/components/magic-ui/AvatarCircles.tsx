import { AvatarCircles } from "../ui/avatar-circles"

const avatars = [
  {
    imageUrl: "assets/images/clients logo/allure.jpg",
    profileUrl: "assets/images/clients logo/allure.jpg",
  },
  {
    imageUrl: "assets/images/clients logo/aman-motors.jpg.jpeg",
    profileUrl: "assets/images/clients logo/aman-motors.jpg.jpeg",
  },
  {
    imageUrl: "assets/images/clients logo/belleza.jpg",
    profileUrl: "assets/images/clients logo/belleza.jpg",
  },
  {
    imageUrl: "assets/images/clients logo/Bunty Mart (1).png",
    profileUrl: "assets/images/clients logo/Bunty Mart (1).png",
  },
  {
    imageUrl: "assets/images/clients logo/mango-tree.jpg",
    profileUrl: "assets/images/clients logo/mango-tree.jpg",
  },
  {
    imageUrl: "assets/images/clients logo/odyssefy.jpg",
    profileUrl: "assets/images/clients logo/odyssefy.jpg",
  },
]

export function AvatarCirclesRow() {
  return <AvatarCircles numPeople={99} avatarUrls={avatars} />
}
