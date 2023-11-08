/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from "react"
import { Student } from "@prisma/client"
import fmt from "date-fns/format"
import { MousePointerSquareDashed } from "lucide-react"
import satori from "satori"
import { z } from "zod"

import { tcIssueFormSchema } from "@/lib/validations/student"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

import StudentForm from "./details-form"
import { generatePdf } from "./pdf-generation"
import SearchUser from "./search-user"

function TCPage() {
  const [selected, setselected] = useState<Student>()
  const onSubmit = async (data: z.infer<typeof tcIssueFormSchema>) => {
    const geistRegular = await (
      await fetch("/fonts/Geist-Regular.otf")
    ).arrayBuffer()
    const geistMedium = await (
      await fetch("/fonts/Geist-Medium.otf")
    ).arrayBuffer()

    const geistBold = await (await fetch("/fonts/Geist-Bold.otf")).arrayBuffer()

    const svg = await satori(TCFormat(), {
      height: 841.89,
      width: 595.28,
      fonts: [
        {
          name: "Geist",
          data: geistRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Geist",
          data: geistMedium,
          weight: 500,
          style: "normal",
        },
        {
          name: "Geist",
          data: geistBold,
          weight: 800,
          style: "normal",
        },
      ],
    })
    generatePdf(svg, 595.28, 841.89, (url) => {
      window.open(url, "_blank")
    })
  }
  return (
    <div className="p-5">
      <SearchUser value={selected} setValue={setselected} />
      {selected ? (
        <>
          <div className="grid gap-6 p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>{selected?.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-wrap items-center space-x-5">
                  <div className="my-3">
                    <p className="text-sm font-medium leading-none">
                      {selected?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Admn No: {selected?.admissionNo}
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="text-sm font-medium leading-none">
                      {selected?.parentName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selected?.parentAddress}
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="text-sm font-medium leading-none">
                      {selected?.caste}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {selected?.religion}
                    </p>
                  </div>
                  <div className="my-3">
                    {selected?.dateOfAdmission && (
                      <p className="text-sm font-medium leading-none">
                        {fmt(selected?.dateOfAdmission, "dd/MM/yyyy")}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {selected?.previousInstitution}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="mt-3 ">
            <StudentForm id={selected.id} onSubmit={onSubmit} />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center py-14">
          <MousePointerSquareDashed className="h-24  w-24 text-secondary-foreground" />
          <p>Select student from the list to proceed</p>
        </div>
      )}
    </div>
  )
}

export default TCPage

export const TCFormat = () => {
  const fontScale = 0.8
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: "Geist",
        backgroundColor: "#fff",
        fontSize: fontScale * 12,
        paddingTop: 20,
        fontWeight: 500,
      }}
    >
      <img
        width={100}
        src={"/images/govt-logo.png"}
        style={{
          maxWidth: "80%",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: fontScale * 10,
          textTransform: "uppercase",
        }}
      >
        <div>Government of Kerala</div>
        <div>Department of Technical Education</div>
      </div>
      <div
        style={{
          fontSize: fontScale * 16,
          fontWeight: 800,
          textTransform: "uppercase",
        }}
      >
        Govt. Polytechnic College, Perinthalmanna
      </div>
      <div>Angadipuram, Malappuram Dist, Kerala State - 679321</div>
      <div>Phone: 04933 227253, Email: polypmna@gptcperinthalmanna.in</div>

      <div
        style={{
          marginTop: 8,
          textDecorationLine: "underline",
          fontSize: fontScale * 16,
          fontWeight: 800,
          textTransform: "uppercase",
        }}
      >
        TRANSFER CERTIFICATE
      </div>

      <div
        style={{
          marginTop: 0,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            marginTop: 0,
            borderWidth: 1,
            paddingLeft: 10,
            paddingRight: 10,
            padding: 5,
            fontSize: fontScale * 14,
            borderColor: "#000",
            fontWeight: 600,
          }}
        >
          TC No. 178/22-23
        </div>
        <div
          style={{
            marginTop: 0,
            borderWidth: 1,
            paddingLeft: 10,
            paddingRight: 10,
            padding: 5,
            fontSize: fontScale * 14,
            borderColor: "#000",
            fontWeight: 600,
          }}
        >
          Admission No. 11948
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 20,
        }}
      >
        {/* Repeat this block */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>Name of Pupil ( in block letters)</div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "50%",
              justifyContent: "flex-start",
            }}
          >
            <div style={{ marginRight: 20 }}>: </div>
            <div>AMAL KRISHNAN. P</div>
          </div>
        </div>
      </div>
      {/* Repeat this block */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <div>Signature of the Head of institution with seal</div>
        </div>
      </div>
      <div
        style={{
          marginTop: 20,
          borderTopWidth: 1,
          borderColor: "#eee",
          width: "100%",
          paddingTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: fontScale * 12,
        }}
      >
        <div
          style={{
            textDecorationLine: "underline",
            fontSize: fontScale * 16,
            fontWeight: 800,
            marginBottom: 10,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Course and Conduct Certificate
        </div>
        <div>This is to certify that Sri./Kum.</div>
        <div
          style={{
            fontWeight: 800,
          }}
        >
          AMAL KRISHNAN
        </div>
        <div>was as bonafide student of this institution</div>
        <div>from 25/07/2019 to 28/06/2022.</div>
        <div>She/He completed the prescribed course of studies for the</div>
        <div>Diplama Examination in Electronics Engg.</div>
        <div>His/Her Conduct and Character are Good.</div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            padding: 20,
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Date: 12/04/2013</div>
            <div>Place: Perinthalmanna</div>
          </div>

          <div>Signature of the Head of institution with seal</div>
        </div>
      </div>
    </div>
  )
}