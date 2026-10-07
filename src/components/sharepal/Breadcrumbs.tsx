import DesignAsset from "./DesignAsset";

export default function Breadcrumbs() {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="https://sharepal.in/bangalore">Bangalore</a>
      <DesignAsset name="imgSvg4" />
      <span aria-current="page">Gaming gadgets on rent</span>
    </nav>
  );
}
