<MyModal9 isvisible={visibleModal} onClose={() => setVisibleModal(false)}>
  {arrayNoti.map((array, i) => {
    if (array._id !== applierID) return null;

    return (
      <div key={i}>
        <div>
          <div className="flex justify-around">
            <div>
              <img
                className="w-auto h-[40vh] rounded-lg"
                alt="artist"
                src={`https://nepal-groove-backend-hrxj.vercel.app/${array.appliedBy?.profile_image}`}
              />
            </div>
            <div>
              <h1 className="text-center font-bold text-[28px] text-black">
                {array.appliedBy?.firstname} {array.appliedBy?.lastname}
              </h1>
              <div className="flex gap-4 justify-center">
                <h1 className="uppercase text-[14px] font-medium">
                  {array.appliedBy?.gender}
                </h1>
                <h1 className="uppercase text-[14px] font-medium">
                  {array.appliedBy?.address}
                </h1>
                <h1 className="uppercase text-[14px] font-medium">
                  {array.appliedBy?.phonenumber}
                </h1>
              </div>
              <div>
                <h1 className="flex justify-center gap-2">
                  <p className="uppercase text-[14px] font-medium mt-0.5">
                    Artist Type:
                  </p>
                  {array.appliedBy?.band}
                </h1>
                <h1 className="flex justify-center gap-1">
                  <p className="uppercase text-[14px] font-medium mt-0.5">
                    Artist Genre:
                  </p>
                  {array.appliedBy?.genre}
                </h1>
                <h1 className="flex justify-center">
                  <p className="uppercase text-[14px] font-medium mt-0.5">
                    Artist Skill:
                  </p>
                  {array.appliedBy?.skill}
                </h1>
                <h1 className="flex justify-center">
                  <p className="uppercase text-[14px] font-medium mt-0.5">
                    Experience Level:
                  </p>
                  {array.appliedBy?.expereince}
                </h1>
                <h1 className="text-center mt-5">
                  <p className="uppercase text-[14px] font-medium mt-0.5">
                    Artist Description
                  </p>
                  {array.appliedBy?.bio}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-[20%] mt-5">
            <button
              className="bg-blue-600 px-6 py-2 rounded-xl text-white hover:bg-orange-400"
              onClick={() => acceptHandler(array._id, array.appliedGig)}
            >
              Accept
            </button>
            <button
              onClick={() => deleteHandler(array._id)}
              className="bg-green-600 px-6 py-2 rounded-xl text-white hover:bg-purple-500"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  })}
</MyModal9>