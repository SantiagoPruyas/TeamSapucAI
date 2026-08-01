export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      departamentos: {
        Row: {
          created_at: string
          id: string
          nombre: string
        }
        Insert: {
          created_at?: string
          id?: string
          nombre: string
        }
        Update: {
          created_at?: string
          id?: string
          nombre?: string
        }
        Relationships: []
      }
      interests: {
        Row: {
          created_at: string
          icono: string
          id: string
          nombre: string
          slug: string
        }
        Insert: {
          created_at?: string
          icono: string
          id?: string
          nombre: string
          slug: string
        }
        Update: {
          created_at?: string
          icono?: string
          id?: string
          nombre?: string
          slug?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          leida: boolean
          proposal_id: string | null
          tipo: Database["public"]["Enums"]["tipo_notificacion"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          leida?: boolean
          proposal_id?: string | null
          tipo: Database["public"]["Enums"]["tipo_notificacion"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          leida?: boolean
          proposal_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_notificacion"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          departamento_id: string | null
          dni: string | null
          id: string
          nombre: string
          rol: Database["public"]["Enums"]["rol"]
        }
        Insert: {
          created_at?: string
          departamento_id?: string | null
          dni?: string | null
          id: string
          nombre?: string
          rol?: Database["public"]["Enums"]["rol"]
        }
        Update: {
          created_at?: string
          departamento_id?: string | null
          dni?: string | null
          id?: string
          nombre?: string
          rol?: Database["public"]["Enums"]["rol"]
        }
        Relationships: [
          {
            foreignKeyName: "profiles_departamento_id_fkey"
            columns: ["departamento_id"]
            isOneToOne: false
            referencedRelation: "departamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_interests: {
        Row: {
          interest_id: string
          proposal_id: string
        }
        Insert: {
          interest_id: string
          proposal_id: string
        }
        Update: {
          interest_id?: string
          proposal_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposal_interests_interest_id_fkey"
            columns: ["interest_id"]
            isOneToOne: false
            referencedRelation: "interests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposal_interests_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          autor_diputado_id: string | null
          created_at: string
          estado: Database["public"]["Enums"]["estado_propuesta"]
          id: string
          publicada_at: string | null
          resumen_ia: string | null
          texto_original: string
          titulo: string
        }
        Insert: {
          autor_diputado_id?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_propuesta"]
          id?: string
          publicada_at?: string | null
          resumen_ia?: string | null
          texto_original: string
          titulo: string
        }
        Update: {
          autor_diputado_id?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_propuesta"]
          id?: string
          publicada_at?: string | null
          resumen_ia?: string | null
          texto_original?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "proposals_autor_diputado_id_fkey"
            columns: ["autor_diputado_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      responses: {
        Row: {
          audio_url: string | null
          created_at: string
          diputado_id: string
          id: string
          proposal_id: string
          texto: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          diputado_id: string
          id?: string
          proposal_id: string
          texto: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          diputado_id?: string
          id?: string
          proposal_id?: string
          texto?: string
        }
        Relationships: [
          {
            foreignKeyName: "responses_diputado_id_fkey"
            columns: ["diputado_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "responses_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      sapucais: {
        Row: {
          audio_url: string | null
          created_at: string
          estado_procesamiento: Database["public"]["Enums"]["estado_procesamiento"]
          id: string
          moderacion_motivo: string | null
          moderacion_ok: boolean | null
          postura: Database["public"]["Enums"]["postura"] | null
          proposal_id: string
          transcripcion: string | null
          user_id: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          estado_procesamiento?: Database["public"]["Enums"]["estado_procesamiento"]
          id?: string
          moderacion_motivo?: string | null
          moderacion_ok?: boolean | null
          postura?: Database["public"]["Enums"]["postura"] | null
          proposal_id: string
          transcripcion?: string | null
          user_id: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          estado_procesamiento?: Database["public"]["Enums"]["estado_procesamiento"]
          id?: string
          moderacion_motivo?: string | null
          moderacion_ok?: boolean | null
          postura?: Database["public"]["Enums"]["postura"] | null
          proposal_id?: string
          transcripcion?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sapucais_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sapucais_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_interests: {
        Row: {
          interest_id: string
          user_id: string
        }
        Insert: {
          interest_id: string
          user_id: string
        }
        Update: {
          interest_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_interests_interest_id_fkey"
            columns: ["interest_id"]
            isOneToOne: false
            referencedRelation: "interests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_interests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fanout_notificaciones: {
        Args: { p_id: string; p_tipo: string }
        Returns: undefined
      }
      propuesta_stats: {
        Args: { p_id: string }
        Returns: {
          a_favor: number
          en_contra: number
          neutro: number
          pendientes: number
        }[]
      }
      propuesta_stats_por_depto: {
        Args: { p_id: string }
        Returns: {
          a_favor: number
          departamento: string
          en_contra: number
          neutro: number
        }[]
      }
    }
    Enums: {
      estado_procesamiento: "pendiente" | "listo" | "error"
      estado_propuesta: "borrador" | "procesando" | "publicada" | "cerrada"
      postura: "a_favor" | "en_contra" | "neutro"
      rol: "ciudadano" | "equipo_camara" | "diputado"
      tipo_notificacion: "nueva_propuesta" | "respuesta_diputado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      estado_procesamiento: ["pendiente", "listo", "error"],
      estado_propuesta: ["borrador", "procesando", "publicada", "cerrada"],
      postura: ["a_favor", "en_contra", "neutro"],
      rol: ["ciudadano", "equipo_camara", "diputado"],
      tipo_notificacion: ["nueva_propuesta", "respuesta_diputado"],
    },
  },
} as const

