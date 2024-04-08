"use client";
import type { ModalProps } from "@/app/interfaces/ModalProps";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Modal,
  ModalContent,
  ModalFooter,
  Textarea
} from "@nextui-org/react";
import React, { useState } from "react";

const ReportModal: React.FC<ModalProps> = ({ isOpen, onClose, size }) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const dummydata = {
    ReasonTitle: "I don't like it",
    User: "John Wick",
    Listing: "Listing 1",
    email: "test@testing.com",
    Reason: "It's inaccurate",
    location: "location",
    Description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, quidem. Labore officiis neque obcaecati in expedita distinctio dolores odio molestiae delectus, eius, dicta nihil. Sit tempora quaerat exercitationem suscipit quis, eum ratione, debitis ex ipsam non repudiandae nostrum a repellat natus! Necessitatibus consequuntur maxime porro tenetur optio omnis rem molestiae neque. Commodi enim velit excepturi fugit omnis. Cupiditate doloribus atque harum quos sunt provident. Unde nobis dicta dolorem blanditiis, laboriosam tempore fuga optio quos porro praesentium iste libero impedit animi enim exercitationem. Alias quae sapiente magni error quia, quidem eos. Necessitatibus fugiat optio enim quis inventore aliquam, labore minima aliquid debitis delectus corrupti voluptatibus consequuntur accusamus officiis eveniet velit blanditiis cumque voluptas porro placeat omnis rerum repellendus, saepe sint. Eos, suscipit quis optio quam consectetur soluta corporis in, repellat molestiae at perferendis. Id, architecto cumque sapiente odio possimus neque nam, commodi et excepturi perspiciatis molestias ut rerum amet nemo quas. Tempore eius voluptatum eligendi expedita, saepe magni maiores aliquam libero, dicta ipsa placeat qui amet praesentium doloremque vel porro tenetur mollitia iure minus! Perspiciatis, soluta hic porro ratione non, quod, at nam asperiores nisi quisquam dolore voluptatum repellendus distinctio et unde? Quisquam rem nisi tempore in voluptas, aperiam doloribus nesciunt ducimus dolore veniam unde? Eum dolorem eos debitis omnis, laudantium accusamus pariatur expedita quam nam id tempore consequatur, illo quos velit necessitatibus nulla reiciendis dolore unde architecto nesciunt suscipit aspernatur amet distinctio. Quis iusto obcaecati vitae fugiat, beatae doloremque eligendi hic, cupiditate modi nesciunt tempora excepturi, ut minima. Modi mollitia veritatis nulla itaque facere unde eaque harum, omnis similique ducimus illo quia ea velit eveniet tenetur assumenda soluta dolorem ullam tempore qui exercitationem explicabo! Quae delectus ab sapiente rerum cupiditate? Impedit voluptate, cum quibusdam eligendi fugit ex sunt iste aperiam nam expedita atque blanditiis cupiditate dolorem quos dolore mollitia, earum facere voluptatem tempore esse. Libero, ipsam officiis inventore debitis doloribus beatae eveniet sapiente ratione quisquam asperiores aspernatur ex numquam corporis nesciunt a accusantium voluptas, ea deleniti? Quo molestias voluptatibus laudantium expedita nam in sapiente consequuntur unde numquam aperiam magni et, sit corrupti a totam eius incidunt reiciendis. Architecto doloremque, saepe a reprehenderit neque suscipit blanditiis facere minima commodi qui accusantium culpa sequi eos voluptates consequatur necessitatibus magni. Commodi, a! Nesciunt neque ducimus obcaecati, quos iusto alias inventore. Adipisci fuga numquam dignissimos quos incidunt amet hic soluta rerum tempora corrupti nam, eligendi dolorum ducimus, sequi vero recusandae, saepe harum quae expedita et qui asperiores. Obcaecati vel doloremque reprehenderit! Facere quibusdam officiis fugit beatae ullam error nesciunt assumenda, eligendi quis, necessitatibus quos quidem consectetur asperiores id iure magnam soluta labore ut rerum. Ratione, dolores omnis illo fugit commodi quas magnam atque sed libero non deleniti nobis quaerat ad repellendus provident voluptatibus, adipisci porro cupiditate possimus cumque dignissimos? Rem nulla saepe delectus, cum commodi tempore dolorum itaque excepturi et officia voluptatibus iste iusto exercitationem sit veritatis facere sapiente magni debitis cupiditate beatae quidem consectetur, ea quisquam. Maxime, temporibus aut. Nemo ea totam itaque aperiam praesentium, reiciendis in corporis, expedita nisi veritatis atque corrupti."
  };
  const dummyhostdata = {
    name: "John Weak",
    email: "testing@testing.com"
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setIsCheckboxChecked(event.target.checked);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        placement="top-center"
        className="rounded-3xl p-5"
      >
        <ModalContent>
          <div className="px-5 py-5">
            <div>
              <div className="flex items-center gap-3 px-5 ">
                <div className="text-3xl font-bold">{dummydata.Reason}</div>
                <Chip className="bg-success-300 text-success-600" size="sm">
                  Open
                </Chip>
              </div>
              <div className="flex items-center px-5">
                <Avatar className="m-2 px-6 py-6" />
                <div>
                  <div className="font-bold">
                    {dummydata.User} on {dummydata.Listing} @{" "}
                    {dummydata.location}
                  </div>
                  <div>{dummydata.email}</div>
                </div>
              </div>
            </div>
            <Textarea
              isReadOnly
              autoFocus={false}
              value={dummydata.Description}
              fullWidth
              className=" my-5 px-5"
            />
            <div className="mx-5 flex items-center justify-end text-right">
              <div>
                <div className="font-bold">
                  Listing hosted by {dummyhostdata.name}
                </div>
                <div className="text-sm"> {dummyhostdata.email}</div>
              </div>
              <Avatar className="m-2  flex justify-end px-6 py-6" />
            </div>
          </div>
          <ModalFooter className=" mx-5">
            <Checkbox
              defaultChecked={isCheckboxChecked}
              onChange={handleCheckboxChange}
              radius="none"
              color="default"
              size="sm"
            >
              I have resolved this report by contacting the conflicting parties
              and other appropriate actions upon receiving this issue.
            </Checkbox>
            <Button
              className="bg-primary text-white"
              isDisabled={!isCheckboxChecked}
              onPress={isCheckboxChecked ? onClose : undefined}
            >
              Resolve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportModal;
