import React, { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

// export default function AddCabin() {
//   // ✅ Use array destructuring
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <Button
//         onClick={() => setIsOpen((show) => !show)}
//         size="large"
//         variation="primary"
//       >
//         {isOpen ? "Close Form" : "Add new Cabin"}
//       </Button>
//       {isOpen && (
//         <Modal onClose={() => setIsOpen(false)}>
//           <CreateCabinForm onCloseModel={() => setIsOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
