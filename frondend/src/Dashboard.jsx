import React from "react";
import SectionCard from "./SectionCard";

export default function Dashboard() {
  return (
    <div
      className="dashboard"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "20px",
        padding: "20px",
        width: "100%",
        minHeight: "100vh",
        background: "#FFF5F7",
      }}
    >
      <SectionCard
        id="skin"
        title="Skin Care"
        desc="Explore personalized skin care routines, product recommendations, and expert tips to help you achieve glowing, healthy skin."
        img="https://plus.unsplash.com/premium_photo-1682096423780-41ca1b04af68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2tpbiUyMGNhcmV8ZW58MHx8MHx8fDA%3D"
        bg="#ffffff"
        textColor="#FF6F91"
        link="/skin-care"
      />

      <SectionCard
        id="hair"
        title="Hair Care"
        desc="Find the best hair care products, styles, and treatments tailored to your hair type and goals for luscious, healthy locks."
        img="https://images.unsplash.com/photo-1564141696939-9eb6e957ccfc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhhaXIlMjBjYXJlfGVufDB8fDB8fHww"
        bg="#ffffff"
        textColor="#FFC75F"
        link="/hair-care"
      />

      <SectionCard
        id="body"
        title="Body Care"
        desc="Discover routines, fitness tips, and self-care practices to maintain a healthy, radiant body inside and out."
        img="https://media.istockphoto.com/id/1405519032/photo/young-woman-does-yoga-for-healthy-lifestyle-on-sea-beach-at-palm-trees-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=iz-VMj108BFKatOrUm4RBh6DWLBrHF-jj821m6vyEIQ="
        bg="#ffffff"
        textColor="#2C2C54"
        link="/body-care"
      />
    </div>
  );
}
